import React, { useContext, useEffect, useState, useRef } from "react";
import VideoCallContext from "../../context/VideoCallContext";
import "./VideoCall.css";
import { Input,Avatar } from "antd";
import VideoIcon from "../../assests/icons/video.svg";
import Mic from "../../assests/icons/mic.svg";
import MicOff from "../../assests/icons/mic-off.svg";
import imagecamera from "../../assests/icons/imagecamera.png";
import Speaker from "../../assests/icons/speaker.svg";
import imagelogo from "../../assests/icons/imagelogo.png";
import VideoOff from "../../assests/icons/video-off.svg";
import Msg from "../../assests/icons/chat.svg";
import PaperClip from "../../assests/icons/attachment.svg";
import profilewomen from "../../assests/icons/profilewomen.png";
import ScreenShare from "../../assests/icons/screen.svg";
import Sendicon from "../../assests/icons/Sendicon.png";
import { UserOutlined } from "@ant-design/icons";
import imagesclose from "../../assests/icons/imagesclose.png";
import Hang from "../../assests/icons/call.svg";
import imageprofile from "../../assests/icons/imageprofile.png";
import parse from "html-react-parser";
import settings from "../../assests/settings.jpg";

import * as filestack from "filestack-js";

const client = filestack.init("ALQeyzXAxTv6MbAdyFxNfz");

const { Search } = Input;
const Video = () => {
  const {
    socketRef,
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    callEnded,
    me,
    mySocketIdRef,
    leaveCall,
    answerCall,
    sendMsg: sendMsgFunc,
    msgRcv,
    chat,
    setChat,
    userName,
    myVdoStatus,
    handleScreenSharing,
    userVdoStatus,
    otherUserScreenShareStatus,
    updateVideo,
    myMicStatus,
    userMicStatus,
    updateMic,
    calling,
    Audio,
    setCallDecline,
    declineCall,
    callStatus,
    setMaxDuration,
    callDecline,
    setMaxCallTime,
    maxDurationRef,
    maxCallTimeRef,
    pricePerMinute,
    callDeclineTimeoutRef,
    otherUser,
    screenShare,
    otherUserName,
    scrollToBottomOfChat,
    notifyMe,
    isShown,
    setIsShown,
    testAudioPlaying, 
    setTestAudioPlaying,
    toggleTestAudio,
    inCallRef,
    callConnected,
    callTime,
    amount,
    stopTimer,
    stopCountDown,
    countDown,
    activeStream,
    setMyVdoStatus,
    myVideoStatusRef,
    myVideoInitialStatusRef,
    myMicStatusRef,
    myMicInitialStatusRef,
    cd, 
    setCd,
    setMyMicStatus,
    downloadImage,
    chatRef,
    showSettingsModel,
    setShowSettingsModel,
    showSettingsModelRef,
    myStatusRef
  } = useContext(VideoCallContext);

  const [sendMsg, setSendMsg] = useState("");
  const [mute, setMute] = useState(false);
  const [videoMe, setVideoMe] = useState("video-me");
  const [videoYou, setVideoYou] = useState("video-you");

  const Attachment = useRef(null);
  const analyserCanvasDuringCall = useRef(null);

  const handleClick = (event) => {
    if(callConnected){
      setIsShown((current) => !current);
    }
  };

  // const declineCallOnPageReload = (e) => {
  //   console.log('inCallRef.current',inCallRef.current)
  //   // if(inCallRef.current){
  //     let message = "Are you sure?"
  //     e.returnValue = message
  //     console.log('inCallRef decline')
  //     leaveCall()
  //     return message
  //   // }
  // }

  // useEffect(()=>{
  //   window.addEventListener("beforeunload",declineCallOnPageReload);
  //   return () => {
  //     window.removeEventListener("beforeunload",declineCallOnPageReload);
  //   }
  // },[])

  useEffect(()=>{
    scrollToBottomOfChat()
  },[isShown])

  const testMicrophoneDuringCall = async () => {
    const audioCtx = new AudioContext(); 
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;       
    const audioSrc = audioCtx.createMediaStreamSource(stream);
    audioSrc.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    const ctx = analyserCanvasDuringCall.current.getContext('2d');
    const draw = (dataParm) => {
      ctx.clearRect(0, 0, analyserCanvasDuringCall.current.width, analyserCanvasDuringCall.current.height);
      dataParm = [...dataParm];             
      ctx.fillStyle = 'white';  // white background          
      ctx.lineWidth = 10; // width of candle/bar
      ctx.strokeStyle = '#000000'; // color of candle/bar
      const space = analyserCanvasDuringCall.current.width / dataParm.length;
      dataParm.forEach((value, i) => {
          ctx.beginPath();
          ctx.moveTo(space * i, analyserCanvasDuringCall.current.height); // x,y
          ctx.lineTo(space * i, analyserCanvasDuringCall.current.height - value); // x,y
          ctx.stroke();
      });         
    };
    const loopingFunction = () => {
      if(showSettingsModelRef.current){
        requestAnimationFrame(loopingFunction);
        analyser.getByteFrequencyData(data);
        draw(data);
      }
    };
    /* "requestAnimationFrame" requests the browser to execute the code during the next repaint cycle. This allows the system to optimize resources and frame-rate to reduce unnecessary reflow/repaint calls. */
    requestAnimationFrame(loopingFunction);
  }

  useEffect(()=>{
    if(stream){
      if(stream.getVideoTracks().length > 0)
      {
        myVideo.current.srcObject = stream
        setMyVdoStatus(true)
        myVideoInitialStatusRef.current = true
        myVideoStatusRef.current = true
      }
      if(stream.getAudioTracks().length > 0) 
      {
        setMyMicStatus(true)
        myMicInitialStatusRef.current = true
        myMicStatusRef.current = true
        testMicrophoneDuringCall()
      }
    }
    console.log('activeStream.current',activeStream.current)
  },[stream])

  useEffect(() => {
    if (me && otherUser) {

      countDown.off("change");
      countDown.on("change", (val) => {
        console.log("cd", val);
        setCd(val);
        if (val === "0:00") {
          leaveCall();
          stopCountDown()
        }
      });
  
    }
  }, [me,otherUser]);

  useEffect(()=>{
    console.log("test chat msgrcv socket",socketRef.current)
    socketRef.current.off("msgRcv")
    socketRef.current.on("msgRcv", ({ replaceIndex, msg: value, sender, file, fileUrl,fileType }) => {
      console.log("test chat msgrcv")
      const msg = {};
      msg.msg = value;
      msg.file = file;
      msg.fileUrl = fileUrl;
      msg.fileType = fileType;
      msg.type = "rcv";
      msg.sender = sender;
      msg.timestamp = Date.now();
      console.log('msgs', chatRef.current)
      if(replaceIndex >= 0) {
          chatRef.current[replaceIndex] = msg;
      } else {
          chatRef.current = [...chatRef.current, msg]
      }
      setChat(chatRef.current);
      setIsShown(true)
      if (document.hidden || !document.hasFocus()) {
        notifyMe('Message received',"You have a new message on video call")
      }

      if(fileType && fileType === 'image') {
        downloadImage(fileUrl, value)
      }
    });
    if (dummy?.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
    scrollToBottomOfChat()
  },[chat])

  useEffect(()=>{
    if(showSettingsModel && stream && stream.getAudioTracks().length !== 0){
      testMicrophoneDuringCall()
    }
  },[showSettingsModel])

  const updateSpeakerStatus = () => {
    setMute(!mute);
  };

  const dummy = useRef();

  const onSearch = (value) => {
    if (value && value.length) sendMsgFunc(value);
    setSendMsg("");
  };

  const triggerSettingsModel = () => {
    showSettingsModelRef.current = !showSettingsModel
    setShowSettingsModel((current)=>!current)
  }

  let cdisplay =
    calling ||
      callAccepted ||
      (call.isReceivingCall && !callAccepted && !callDecline)
      ? { textAlign: "center" }
      : { display: "none", textAlign: "center" };

  let d1 =
    calling || (call.isReceivingCall && !callAccepted && !callDecline)
      ? "flex"
      : "none";

  return (
    <>
      {/* Row : 1 Dialer Video call and Receiver Video Call */}
      <div
        className="mainbackgroundcolor"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(32,33,36)",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          flexDirection: "column",
          zIndex: 999999,
          display: d1,
        }}
      >
        <div
          style={{
            width: "100%",
            insert: 'inherit',
            zIndex: "99",
            textAlign: "center",
          }}
        >
          <div>
            {calling ? (
              <>
                <div
                  className="helperSec"
                  style={{
                    border: "2px soild #000",
                    backgroundColor: "rgba(206,212,218,0.3)",
                    padding: "10px",
                    textAlign: "center",
                    margin: "0 auto",
                    marginTop: "40px",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    className="textfontsize"
                    style={{
                      color: "#FFFFFF",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    {calling ? `Helper: ${otherUserName}` : `Buyer: ${call.name}`}
                  </div>
                  <div
                    className="textfontsize"
                    style={{
                      color: "#FFFFFF",
                      fontSize: "17px",
                      textAlign: "center",
                      fontWeight: "800",
                      marginTop: "4px",
                    }}
                  >
                    {otherUserName}
                  </div>
                  <div
                    className="textfontsize"
                    style={{
                      color: "#FFFFFF",
                      fontSize: "16px",
                      textAlign: "center",
                      marginTop: "8px",
                    }}
                  >
                    New York Travel Service
                  </div>
                  <div
                    className="textfontsize"
                    style={{
                      color: "#FFFFFF",
                      fontSize: "16px",
                      textAlign: "center",
                      marginTop: "8px",
                    }}
                  >
                    USD {pricePerMinute.toFixed(2)}/min
                  </div>
                </div>{" "}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="mobilescreen">
            {calling ? (
              <>
                <div style={{ margin: "0 auto", marginTop: "25px" }}>
                  <div
                    className="textstyle1"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      fontSize: "15px",
                      textAlign: "center",
                    }}
                  >
                    {calling ? `Helper: ${otherUserName}` : `Buyer: ${call.name}`}
                  </div>
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      justifyContent: "center",
                      width: "90%",
                    }}
                  >
                    <div style={{ marginRight: "6px", marginBottom: "8" }}>
                      <img
                        src={imagecamera}
                        alt="camera"
                        style={{ width: "35px", height: "30px" }}
                      />
                    </div>
                    <div>
                      <div
                        className="textstyle2"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.5)",
                          fontSize: "15px",
                          textAlign: "center",
                        }}
                      >
                        Alex Hales Alex Hales Alex Hal
                      </div>
                    </div>
                  </div>
                  <div
                    className="textstyle3"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    New York Travel aaaaaaaaaaaaaa
                  </div>
                  <div
                    className="textstyle4"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    USD {pricePerMinute.toFixed(2)}/min
                  </div>
                </div>{" "}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="Sceondmobilescreen">
            {!calling ? (
              <>
                <div
                  className="logowidth"
                  style={{
                    marginTop: "15px",
                  }}
                >
                  <div
                    className="mobilescreencameraicon"
                    style={{ margin: "auto", marginTop: "40px" }}
                  >
                    <img
                      src={imagecamera}
                      alt="camera"
                      style={{ width: "35px", height: "30px" }}
                    />
                  </div>
                  <div className="" style={{}}>
                    <img
                      src={imagelogo}
                      alt="camera"
                      style={{ width: "138px", height: "88px" }}
                    />
                  </div>
                </div>
                <div
                  className="helperSec2"
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: "5px",
                    width: "24%",
                    textAlign: "center",
                    margin: "0 auto",
                    marginTop: "5px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    className="Secondtextstyle1"
                    style={{
                      color: "#02B100",
                      fontSize: "20px",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                      marginTop: "0px",
                    }}
                  >
                    Incoming call
                  </div>
                  <div
                    className="Secondtextstyle2"
                    style={{ color: "#000000", fontSize: "15px" }}
                  >
                    {calling ? `Helper: ${otherUserName}` : `Buyer: ${call.name}`}
                  </div>
                  <div
                    className="Secondtextstyle3"
                    style={{ color: "#2965BA", fontSize: "16px" }}
                  >
                    John dee on thirty lettersedss
                  </div>
                  <hr className="hrborderwidth"></hr>
                  <div
                    className="Secondtextstyle4"
                    style={{ color: "#000000", fontSize: "15px" }}
                  >
                    Requesting service:{" "}
                  </div>
                  <div
                    className="Secondtextstyle5"
                    style={{ color: "#2965BA", fontSize: "16px" }}
                  >
                    New York travel is required this
                  </div>
                  <hr className="hrborderwidth"></hr>
                  <div
                    className="Secondtextstyle6"
                    style={{ color: "#000000", fontSize: "15px" }}
                  >
                    USD {pricePerMinute.toFixed(2)}/min
                  </div>
                  <div
                    className="Secondtextstyle7"
                    style={{ color: "#2965BA", fontSize: "15px" }}
                  >
                    Call can last up to {call.maxCallTime}
                  </div>
                  <div
                    className="Secondtextstyle8"
                    style={{ color: "#000000", fontSize: "15px" }}
                  >
                    Payment receive method: Bank account555
                  </div>
                </div>{" "}
              </>
            ) : (
              ""
            )}
          </div>
          {/* ............................................................................................................................................................................ */}
          <div className="profilewomentop">
            {!calling ? (
              <>
                {" "}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    className="profilewomen"
                    src={profilewomen}
                    alt="profilewomen"
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          {calling ? (
            <>
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    className="profileImg"
                    src={imageprofile}
                    alt="profile"
                  />
                </div>
                <div
                  className="tasktxt"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      color: "#FFF",
                      fontSize: "18px",
                      fontWeight: "300",
                      letterSpacing: "1px",
                    }}
                  >
                    Dialing on helper side
                  </span>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div
          className="footerbottom"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            padding: "12px",
            zIndex: 99999
          }}
        >
          <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
            <div
              className="iconsDiv"
              style={{ justifyContent: "space-around" }}
            >
              {calling ? (
                <></>
              ) : (
                <div
                  className="icons"
                  style={{ backgroundColor: "#ff0000" }}
                  onClick={() => {
                    declineCall();
                  }}
                >
                  <img
                    src={Hang}
                    alt="Decline Call"
                    style={{ width: "26px", height: "26px" }}
                  />
                </div>
              )}
              <div
                className="icons2"
                onClick={() => {
                  updateMic();
                }}
                tabIndex="0"
              >
                {myMicStatus ? (
                  <img
                    src={Mic}
                    alt="mic on icon"
                    style={{ width: "26px", height: "26px" }}
                  />
                ) : (
                  <img
                    src={MicOff}
                    alt="mic off icon"
                    style={{ width: "26px", height: "26px" }}
                  />
                )}
              </div>
              {!calling ? (
                <></>
              ) : (
                <div
                  className="icons"
                  style={{ backgroundColor: "#ff0000" }}
                  onClick={() => {
                    declineCall();
                  }}
                >
                  <img
                    src={Hang}
                    alt="Decline Call"
                    style={{ width: "26px", height: "26px" }}
                  />
                </div>
              )}
              <div
                className="icons3"
                onClick={() => updateVideo()}
                tabIndex="0"
              >
                {myVdoStatus ? (
                  <img
                    src={VideoIcon}
                    alt="video on icon"
                    style={{ width: "26px", height: "26px" }}
                  />
                ) : (
                  <img
                    src={VideoOff}
                    alt="video off icon"
                    style={{ width: "26px", height: "26px" }}
                  />
                )}
              </div>
              {calling ? (
                <></>
              ) : (
                <div
                  className="icons"
                  style={{ backgroundColor: "#0FE90D" }}
                  onClick={() => {
                    console.log("busy button socket",socketRef.current)
                    clearTimeout(callDeclineTimeoutRef.current)
                    socketRef.current.emit("busy", {
                      id: mySocketIdRef.current,
                    });
                    myStatusRef.current = "busy";
                    answerCall();
                    setCallDecline(true);
                    setMaxCallTime(call.maxCallTime);
                    setMaxDuration(call.maxDuration);
                    maxCallTimeRef.current = call.maxCallTime;
                    maxDurationRef.current = call.maxDuration;
                    Audio.current.pause();
                  }}
                >
                  <img
                    src={Hang}
                    alt="Accept Call"
                    style={{ width: "26px", height: "26px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="videoheight" style={{ textAlign: "center" }}>
        {stream && (
          <div
            style={cdisplay}
            className={`me ${videoMe}`}
            id={callAccepted && !callEnded ? "video1" : "video3"}
            // onClick={() => {
            //   if (videoMe === "video-me") {
            //     setVideoMe("video-you");
            //     setVideoYou("video-me");
            //   }
            // }}
          >
            <div className="video-avatar-containerOne">
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className="video-active1"
                style={{
                  opacity: `${myVdoStatus || screenShare ? "1" : "0"}`,
                }}
              />
              <Avatar
                style={{
                  backgroundColor: "#44d62c",
                  position: "absolute",
                  opacity: `${myVdoStatus || screenShare ? "-1" : "2"}`,
                }}
                size={98}
                icon={!name && <UserOutlined />}
              >
                {name}
              </Avatar>
            </div>
          </div>
        )}
        {/* Dialer Video call and  Receiver Video Call */}

        {/* Helper and caller  start*/}
        {(calling || (callAccepted && !callEnded && userVideo)) && (
          <>
            <div
              style={{
                position: "absolute",
                width: "100%",
                top: "35px",
                left: 0,
                textAlign: "center",
                zIndex: 999999,
              }}
            >
              {!userVideo && (
                <div style={{ display: "flex", marginLeft: "10px" }}>
                  <img
                    src={imagecamera}
                    alt="camera"
                    style={{ width: "27px", height: "24px" }}
                  />
                </div>
              )}
              {callAccepted && (
                <div
                  className="textbarheader"
                  style={{
                    backgroundColor: "rgba(206,212,218,100)",
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
                    opacity: "0.5",
                    padding: "4px 4px 2px 2px",
                    borderRadius: "5px",
                    width: "15%",
                    display: "inline-block",
                    marginTop: "15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <div className="txtvideocallaccept"
                      style={{
                        color: "#000",
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "500",
                        opacity: "1",
                      }}
                    >
                      {call.name && call.name !== name
                        ? `Buyer: ${call.name}`
                        : `Helper: ${otherUserName}`}
                    </div>
                  </div>
                  <div className="txtvideocallaccept"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      marginTop: "4px",
                    }}
                  >
                    <span className="txtvideocallaccept"
                      style={{
                        color: "#000",
                        fontSize: "16px",
                        fontWeight: "500",
                        opacity: "1",
                      }}
                    >
                      USD {pricePerMinute.toFixed(2)}/min
                    </span>
                  </div>
                </div>
              )}
              {!userVideo && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "30px",
                    }}
                  >
                    <img
                      src={imageprofile}
                      alt="profile"
                      style={{ width: "120px", height: "120px" }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    <span
                      style={{
                        color: "#FFF",
                        fontSize: "16px",
                        fontWeight: "300",
                      }}
                    >
                      Dialing on helper side
                    </span>
                  </div>
                </div>
              )}
              {/* caht section start */}
              <div className={`chatSection ${!isShown ? 'd-none' : ''}`}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "95%",
                      marginTop: "24px",
                      marginLeft: "7px",
                    }}
                  >
                    <span style={{ fontSize: "16px", color: "#202124", fontWeight: "bold" }}>
                      Help So Easy Chat
                    </span>
                    <img
                      onClick={handleClick}
                      src={imagesclose}
                      alt="close"
                      style={{
                        width: "14px",
                        height: "15px",
                        marginTop: "3px",
                      }}
                    />
                  </div>
                  <div style={{
                      fontSize: 12,
                      textAlign: "left",
                      marginLeft: "7px",
                      marginRight: "7px",
                      marginTop: "10px"
                    }}>
                    Only images can be shared. They will be automatically saved.
                  </div>
                  {/* <hr color="#E2E8EF" style={{ margin: "7px" }}></hr> */}
                    <div className={`msg_flex`}  id="chat-messages">
                      {chat.map((msg,index) =>(
                        <div
                          key={index}
                          className={
                            msg.type === "sent" ? "msg_sent" : "msg_rcv"
                          }
                        >
                          {msg.file ? 
                            <a href={msg.fileUrl} target="_blank" className="fileName">
                              {msg.fileType === 'image' ? (
                                <img alt="File shared" src={msg.fileUrl} width="100%" />
                              ) :
                                parse(msg.msg)
                              }
                            </a>
                            : parse(msg.msg)}
                        </div>
                      ))}
                      {/* <div ref={dummy} id="no_border">Ali Hussain</div> */}
                    </div>
                    <div>
                      <Search
                        placeholder="Send a message to everyone"
                        allowClear
                        className="input_msg"
                        enterButton={
                          <img
                            src={Sendicon}
                            alt="icon"
                            style={{ width: "20px", height: "20px" }}
                          />
                        }
                        onChange={(e) => setSendMsg(e.target.value)}
                        value={sendMsg}
                        size="large"
                        onSearch={onSearch}
                      />
                    </div>
              </div>
            </div>
            {/* caht section end */}
            {cd !== "" && cd !== "0:00" ? (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "40%",
                  color: "#FFF",
                  zIndex: 999999,
                  fontSize: "34px",
                  color: "#00b500",
                  padding: "5px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {cd}
              </div>
            ) : (
              ""
            )}

            {callStatus !== "" && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0",
                  right: "0",
                  color: "#FFF",
                  zIndex: 99999999,
                  fontSize: "34px",
                  color: "#00b500",
                  padding: "5px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {callStatus}
              </div>
            )}

            <div
              className={`you ${videoYou}`}
              style={{ textAlign: "center" }}
              id="video2"
              // onClick={() => {
              //   if (videoYou === "video-me") {
              //     setVideoYou("video-you");
              //     setVideoMe("video-me");
              //   }
              // }}
            >
              <div className="video-avatar-container">
                <video
                  playsInline
                  ref={userVideo}
                  autoPlay
                  muted={mute}
                  className="video-active"
                  style={{
                    opacity: `${userVdoStatus || otherUserScreenShareStatus ? "1" : "0"}`,
                    width: '100%'
                  }}
                />

                <Avatar
                  style={{
                    backgroundColor: "#44d62c",
                    position: "absolute",
                    opacity: `${userVdoStatus || otherUserScreenShareStatus ? "-1" : "2"}`,
                  }}
                  size={98}
                  icon={!(userName || call.name) && <UserOutlined />}
                >
                  {userName || call.name}
                </Avatar>
                {!userMicStatus && (
                  <i
                    style={{
                      position: "absolute",
                      top: 25,
                      right: 25,
                      width: 40,
                      height: 40,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      backgroundColor: "black",
                      borderRadius: "50%",
                      fontSize: 18,
                    }}
                    className="fa fa-microphone-slash fa-2x"
                    aria-hidden="true"
                    aria-label="microphone muted"
                  ></i>
                )}
              </div>
            </div>
          </>
        )}
        {(calling || (callAccepted && !callEnded && userVideo)) && (
          <div
            className="footerbottom2"
            style={{ position: "absolute", bottom: "0", left: "0", right: "0", zIndex: 99999 }}
          >
            {/* {callAccepted && (
              <div
                className="TextMarginBottom"
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "#FFF",
                  fontSize: "15px",
                  margin: "0 auto",
                  padding: "12px 23px 12px 22px",
                  border: "0px solid #FFF",
                  borderRadius: "5px",
                }}
              >
              Talk time {callTime} Estimate including tax and fees: USD ${amount.toFixed(2)}
              </div>
            )} */}
            <div
              className="iconsDiv2"
              style={{ justifyContent: "space-between" }}
            >
              <div
                className="icons2"
                onClick={() => {
                  triggerSettingsModel();
                }}
              >
                <img src={settings} alt="settings" />
              </div>
              <div
                className="icons2"
                onClick={() => {
                  updateMic();
                }}
                tabIndex="0"
              >
                {myMicStatus ? (
                  <img src={Mic} alt="mic on icon" />
                ) : (
                  <img src={MicOff} alt="mic off icon" />
                )}
              </div>

              <div
                className="icons2"
                onClick={() => updateVideo()}
                tabIndex="0"
              >
                {myVdoStatus ? (
                  <img src={VideoIcon} alt="video on icon" />
                ) : (
                  <img src={VideoOff} alt="video off icon" />
                )}
              </div>
              <div
                className={`icons2 ${mute ? "disabled" : ""}`}
                onClick={() => updateSpeakerStatus()}
                tabIndex="0"
              >
                <img src={Speaker} alt="Mute" />
              </div>
              <div
                className="icons2"
                style={{ backgroundColor: "#ff0000", color: "#FFF" }}
                onClick={() => {
                  if (calling && !callAccepted) {
                    declineCall();
                  } else {
                    leaveCall();
                  }
                }}
              >
                <img
                  src={Hang}
                  style={{ filter: "invert(1)" }}
                  alt="End Call"
                />
              </div>
              <div
                className={`icons2 ${!isShown ? "disabled" : ""}`}
                tabIndex="0"
                onClick={handleClick}
              >
                <img src={Msg} alt="chat icon" />
              </div>
              <div
                className={`icons2 ${!screenShare ? "disabled" : ""}`}
                onClick={() => {
                  if (callAccepted && !callEnded) {
                    handleScreenSharing();
                  }
                }}
                tabIndex="0"
              >
                <img src={ScreenShare} alt="share screen" />
              </div>
              <div
                className="icons2"
                onClick={() => {
                  if(callConnected){
                    Attachment.current.click()
                  }
                }}
                tabIndex="0"
              >
                <img src={PaperClip} alt="Send File" />
                <input
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  ref={Attachment}
                  onChange={async (e) => {
                    if (e.target.files[0]) {
                      if(e.target.files[0].type.split("/")[0] === "image") {
                        let replaceIndex = sendMsgFunc(`${name} is sending a file...`, true)
                        client.upload(e.target.files[0]).then((data) => {
                          let type = data.type.split('/')[0]
                          sendMsgFunc(data.url, false, replaceIndex, true, data.filename, type);
                          setIsShown(true);
                        });
                      } else {
                        notifyMe("Unsupported file type","You can not share this file")
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Media settings Model */}
        <div className={`settingsModel ${!showSettingsModel ? 'd-none' : ''}`}>
          <div className="d-flex justify-content-end m-10">
            <img
              onClick={triggerSettingsModel}
              src={imagesclose}
              alt="close"
              style={{
                width: "14px",
                height: "15px",
                marginTop: "3px",
              }}
            />
          </div>
          <div className="p-50 h-400 d-flex flex-column justify-content-between">
            <div>
              <p>Speakers</p>
              <select name="" id="during-call-speakers"></select>
              <button onClick={toggleTestAudio} className={`ms-20 ${testAudioPlaying ? 'bg-danger' : 'bg-success'}`}>{ testAudioPlaying ? "Stop speaker testing" : "Test speaker" }</button>
            </div>
            <div>
              <p>Microphones</p> 
                <select name="" id="during-call-microphones"></select>
                <canvas ref={analyserCanvasDuringCall} className="microphone-canvas" ></canvas>
            </div>
            <div className="">
              <p>Cameras</p>
              <select name="" id="during-call-cameras"></select>
            </div>
          </div>
        </div>
      </div>
      {/* Helper and caller  end*/}
    </>
  );
};

export default Video;
