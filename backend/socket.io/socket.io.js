// const { Call } = require("./models");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const onlineUsers = new Set(); // Set to store online users
const activeCalls = new Map(); // To store active call information

module.exports.onlineUsers = onlineUsers;

module.exports.initSocketIO = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: [process.env.CORS_ORIGIN],
      methods: ["GET", "POST"],
    },
    pingInterval: 1000,
    // pingTimeout: 2500,
    pingTimeout: 10000,
  });

  function findUserBySocketId(socketId) {
    for (const user of onlineUsers) {
      if (user.socketId === socketId) {
        return user;
      }
    }
    return null; // User not found
  }

  function findUserByUuidId(id) {
    for (const user of onlineUsers) {
      if (user.id === id) {
        return user;
      }
    }
    return null; // User not found
  }

  function addUserToActiveCall(callId, socket, myUuid) {
    let call = activeCalls.get(callId);

    if (call) {
      if (call.reconnectionTimeout) {
        clearTimeout(call.reconnectionTimeout);
        call.reconnectionTimeout = null;
      }

      call.participants = [...call.participants, socket.id];
      call.micStats[myUuid] = { toggles: [], totalToggles: { On: 0, Off: 0 } }
      call.videoStats[myUuid] = { toggles: [], totalToggles: { On: 0, Off: 0 } }
    } else {
      // Add the socket to the active call
      activeCalls.set(callId, {
        participants: [socket.id],
        reconnectionTimeout: null,
        buyerConnected: false,
        helperConnected: false,
        callStartingTime: 0,
        micStats: {
          [myUuid]: { toggles: [], totalToggles: { On: 0, Off: 0 } }
        },
        videoStats: {
          [myUuid]: { toggles: [], totalToggles: { On: 0, Off: 0 } }
        },
      });
    }

    // Join a room with the callId (you can use rooms to manage calls)
    socket.join(callId);
    console.log("activeCalls", activeCalls);
  }

  function reconnectUserToActiveCall(callId, socket) {
    let call = activeCalls.get(callId);
    console.log("reconnecting call", call);

    if (call) {
      if (call.reconnectionTimeout) {
        clearTimeout(call.reconnectionTimeout);
        call.reconnectionTimeout = null;
      }

      call.participants = [...call.participants, socket.id];

      // Join a room with the callId (you can use rooms to manage calls)
      socket.join(callId);
      console.log("activeCalls", activeCalls);
    } else {
      // io.to(callId).emit('disconnectTheCall');
      socket.emit("disconnectTheCall");
    }
  }

  function removeCallFromActiveCalls(callId) {
    if (activeCalls.has(callId)) {
      activeCalls.delete(callId); // Remove the call by its callId
    }
    console.log("Updated activeCalls", activeCalls);
  }

  function getUniqueCallId() {
    let callId;
    do {
      callId = Date.now().toString();
    } while (activeCalls.has(callId)); // Check if it already exists in activeCalls
    return callId;
  }

  io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    socket.on("refreshOnlineUsers", function () {
      onlineUsers.clear();
      io.emit("refreshOnlineUsers");
    });

    socket.on("getMySocketId", function () {
      socket.emit("me", socket.id);
    });

    // When user enters otp his/her data is passed......
    socket.on("new_user", function (user) {

      let existingUserWithSameUuidId = findUserByUuidId(user.id);

      if (!user.callId && existingUserWithSameUuidId) {
        return socket.emit("logout");
      }

      if (user.callId && existingUserWithSameUuidId) {
        let activeCall = activeCalls.get(user.callId)
        if(activeCall) {
          // Remove the user from the active call participants list
          activeCall.participants = activeCall.participants.filter(
            (participant) => participant !== existingUserWithSameUuidId.socketId
          );
        }
        onlineUsers.delete(existingUserWithSameUuidId);
      }

      if (user.callId) {
        reconnectUserToActiveCall(user.callId, socket);
      }

      let existingUserWithSameSocketId = findUserBySocketId(socket.id);

      if (existingUserWithSameSocketId) {
        onlineUsers.delete(existingUserWithSameSocketId);
      }

      const obj = {
        id: user.id,
        name: user.name,
        socketId: socket.id,
        status: user.status ? user.status : "online",
        cameraAvailable: user.cameraAvailable,
      };

      onlineUsers.add(obj);

      io.emit("new_connect", Array.from(onlineUsers));

      console.log("new user onlineUsers", onlineUsers);
    });
    // Ends here......

    socket.on(
      "callUser",
      ({
        userToCall,
        fromUuid,
        from,
        name,
        maxDuration,
        maxCallTime,
        callId,
      }) => {
        console.log("callUser");

        addUserToActiveCall(callId, socket, fromUuid);

        // Check if user is online or not
        let user = findUserBySocketId(userToCall);

        if (user) {
          if (user.status === "online") {
            io.to(userToCall).emit("callUser", {
              fromUuid,
              from,
              name,
              maxDuration,
              maxCallTime,
              callId,
            });
          } 
          // else if (user.status === "busy") {
          //   io.to(userToCall).emit("notifyReceiverAboutCall", {
          //     name,
          //   });
          // }
        } else {
          console.log("user not found 1");
        }
      }
    );

    const updateUserStats = (callId, type, currentMediaStatus, triggeredBySocketId, triggeredByUuid) => {
      // Check if user is online or not
      let activeCall = activeCalls.get(callId);
      console.log("in updateUserStats activeCalls",activeCalls)
      console.log("in updateUserStats triggeredByUuid",callId)
      if (activeCall) {
        if (type === "both") {
          // Modify mic and video stats for the found user
          activeCall.micStats[triggeredByUuid].totalToggles[currentMediaStatus[0] ? "On" : "Off"] += 1;
          activeCall.micStats[triggeredByUuid].toggles.push({
            title: currentMediaStatus[0] ? "On" : "Off",
            time: Date.now(),
          });
          activeCall.videoStats[triggeredByUuid].totalToggles[
            currentMediaStatus[1] ? "On" : "Off"
          ] += 1;
          activeCall.videoStats[triggeredByUuid].toggles.push({
            title: currentMediaStatus[1] ? "On" : "Off",
            time: Date.now(),
          });
          io.to(triggeredBySocketId).emit("storeMicAndVideoStats", {
            micStats: activeCall.micStats[triggeredByUuid],
            videoStats: activeCall.videoStats[triggeredByUuid],
          });
        } else if (type === 'mic' || type === 'video') {

          if(!activeCall[type + "Stats"][triggeredByUuid]) {
            activeCall[type + "Stats"][triggeredByUuid] = { toggles: [], totalToggles: { On: 0, Off: 0 } }
          }

          // Modify the specified type of stats for the found user
          activeCall[type + "Stats"][triggeredByUuid].totalToggles[
            currentMediaStatus ? "On" : "Off"
          ] += 1;
          activeCall[type + "Stats"][triggeredByUuid].toggles.push({
            title: currentMediaStatus ? "On" : "Off",
            time: Date.now(),
          });
          io.to(triggeredBySocketId).emit("storeMicAndVideoStats", {
            [type + "Stats"]: activeCall[type + "Stats"],
          });
        }
      } else {
        console.log("activeCall not found 1");
      }
    };

    socket.on("buyerConnected",({callId}) => {
      let activeCall = activeCalls.get(callId);
      if(activeCall) {
        activeCall.buyerConnected = true;
        if (activeCall.helperConnected) {
          activeCall.participants.forEach((participant) => {
            io.to(participant).emit("bothUsersConnected");
          })
          activeCall.callStartingTime = Date.now();
        }
      }
    });

    socket.on("helperConnected",({callId}) => {
      let activeCall = activeCalls.get(callId);
      if(activeCall) {
        activeCall.helperConnected = true;
        if (activeCall.buyerConnected) {
          activeCall.participants.forEach((participant) => {
            io.to(participant).emit("bothUsersConnected");
          })
          activeCall.callStartingTime = Date.now();
        }
      }
    });

    socket.on(
      "updateMyMedia",
      ({ callId, to, type, currentMediaStatus, triggeredBySocketId, triggeredByUuid }) => {
        console.log("updateMyMedia", to, type, currentMediaStatus, triggeredBySocketId);
        io.to(to).emit("updateUserMedia", { type, currentMediaStatus });
        updateUserStats(callId, type, currentMediaStatus, triggeredBySocketId, triggeredByUuid);
      }
    );

    socket.on("msgUser", ({ to, ...rest }) => {
      console.log("msgRcv", to, rest);
      io.to(to).emit("msgRcv", rest);
    });

    socket.on("answerCall", (data) => {
      console.log("answer call", data);

      addUserToActiveCall(data.callId, socket, data.fromUuid);

      io.to(data.to).emit("updateUserMedia", {
        type: data.type,
        currentMediaStatus: data.myMediaStatus,
      });
      io.to(data.to).emit("callAccepted", data);
      updateUserStats(data.callId, data.type, data.myMediaStatus, data.from, data.fromUuid);
    });

    socket.on("endCall", (data) => {
      try {
        io.to(data.otherUserSocketId).emit("endCall", { data });
        let now = Date.now();
        let activeCall = activeCalls.get(data.callId);

        if (activeCall && activeCall.callStartingTime != 0 && !data.cancel) {

          let mySummary = {
            callStartingTime: activeCall.callStartingTime,
            callEndingTime: now,
            micStats: activeCall.micStats[data.myUuid],
            videoStats: activeCall.videoStats[data.myUuid],
          };

          let otherUserSummary = null;
          
          for (const otherUserObj of onlineUsers) {
            if (otherUserObj.socketId === data.otherUserSocketId) {
              otherUserSummary = {
                callStartingTime: activeCall.callStartingTime,
                callEndingTime: now,
                micStats: activeCall.micStats[data.otherUserUuid],
                videoStats: activeCall.videoStats[data.otherUserUuid],
              };
              io.to(data.otherUserSocketId).emit("summary", {
                summary: otherUserSummary,
                otherUserSummary: mySummary,
              });
              break;
            }
          }

          socket.emit("summary", {
            summary: mySummary,
            otherUserSummary,
          });

          removeCallFromActiveCalls(data.callId);
        }
      } catch (error) {
        console.log("error in endCall: " + error);
      }
    });

    socket.on("callEvent", (data) => {
      io.to(data.to).emit("callEvent", { data });
    });

    socket.on("checkUserStatus", (data) => {
      // Check if user is online or not
      let user = findUserBySocketId(data.id);

      if (user) {
        if (user.status === "online") {
          let callId = getUniqueCallId();
          io.to(data.me).emit("userStatus", {
            status: "online",
            id: data.id,
            callId,
          });
        } else {
          io.to(data.me).emit("userStatus", { status: "busy", id: data.id });
          // io.to(user.socketId).emit("notifyReceiverAboutCall", {
          //   name: data.name,
          // });
        }
      } else {
        console.log("user not found 3");
      }
    });

    socket.on("busy", (data) => {
      // Check if user is online or not
      let user = findUserBySocketId(data.id);

      if (user) {
        user.status = "busy";
      } else {
        console.log("user not found 4");
      }
    });

    socket.on("cameraAvailable", (data) => {
      // Check if user is online or not
      let user = findUserBySocketId(socket.id);

      if (user) {
        user.cameraAvailable = data.cameraAvailable;
        io.emit("new_connect", Array.from(onlineUsers));
      } else {
        console.log("user not found 5");
      }
    });

    socket.on("online", (data) => {
      // Check if user is online or not
      let user = findUserBySocketId(data.id);

      if (user) {
        user.status = "online";
      } else {
        console.log("user not found 6");
      }
    });

    // Listen for a user disconnecting
    socket.on("disconnect", (reason) => {
      console.log("disconnecting... reason: ", reason);

      // Check if the user was in an active call
      for (const [callId, call] of activeCalls.entries()) {
        if (call.participants.includes(socket.id)) {
          socket.to(callId).emit("otherUserLostConnection");

          // Remove the user from the participants list
          call.participants = call.participants.filter(
            (participant) => participant !== socket.id
          );

          if (call.participants.length === 0) {
            console.log("disconnecting call because all users disconnected");
            activeCalls.delete(callId);
            socket.to(callId).emit("disconnectTheCall");
          } else {
            if (call.participants.length < 2) {
              // This condition is used because sometimes client disconnection works fast than server disconnection meaning socket from client disconnects first and that same socket disconnects from server side after some time.
              call.reconnectionTimeout = setTimeout(() => {
                if (activeCalls.has(callId)) {
                  console.log("disconnecting call by timeout");
                  socket.to(callId).emit("disconnectTheCall");
                }
              }, 15000);
            }
          }

          console.log("In disconnect: updated activeCalls", activeCalls);
          break;
        }
      }

      const disconnectedUser = findUserBySocketId(socket.id);

      if (disconnectedUser) {
        onlineUsers.delete(disconnectedUser);
        io.emit("new_connect", Array.from(onlineUsers)); // Notify all clients about the disconnected user
      }

      console.log("disconnect onlineUsers", onlineUsers);
    });

    socket.on("signal", (data) => {
      io.to(data.to).emit("signal", data.signal);
    });
  });
};
