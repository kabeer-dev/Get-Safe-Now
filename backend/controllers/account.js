const { handleResponse, handleError } = require('../utils/responses.js');
const onlineUsers = require("../socket.io/socket.io").onlineUsers;

exports.me = (req, res) => {

  let userAlreadyOnline = Array.from(onlineUsers).find(onlineUser => req.user.id === onlineUser.id);

  if(userAlreadyOnline) return handleError(res, "This user is already online on another device or tab!", 403);
  
  handleResponse(res, {user: req.user})
};