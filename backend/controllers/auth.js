const { User } = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const { handleResponse, handleError } = require("../utils/responses");
const onlineUsers = require("../socket.io/socket.io").onlineUsers;

exports.login = (req, res) => {
  const body = req.body;
  User.findOne({
    where: {
      email: body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return handleError(res, "User Not found.", 404);
      }

      var passwordIsValid = bcrypt.compareSync(body.password, user.password);

      if (!passwordIsValid) {
        return handleError(res, "Invalid Password!", 401);
      }

      let userAlreadyOnline = Array.from(onlineUsers).find(onlineUser => user.id === onlineUser.id);

      if(userAlreadyOnline) return handleError(res, "This user is already online on another device or tab!", 403);

      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });
  
      handleResponse(res, {
        user,
        accessToken: token,
      });
    })
    .catch((err) => {
      handleError(res, err);
    });

  // RefSpokenLanguages.findOne({
  //   where: {
  //     id: 1
  //   },
  //    include: User
  // }).then((yes)=>{
  //   console.log(yes)
  // })
};

exports.signUp = (req, res) => {
  const body = req.body;
  if(body.password !== body.confirmPassword){
  
    return handleError(res, "Password and Confirm Password does not matched.", 400);
  }
  // Email
  User.findOne({
    where: {
      email: body.email,
    },
  }).then(async (user) => {
   
    if (user) {
      return handleError(res, "This Email is already Registered.", 400);
    }

    // Nickname
    // User.findOne({
    //   where: {
    //     nickname: body.nickname,
    //   },
    // }).then((user) => {
    //   if (user) {
    //     return handleError(res, "Nickname is already taken.", 400);
    //   }

    User.create({
      email: body.email,
      password: bcrypt.hashSync(body.password, 8),
      nickName: body.nickName,
      firstName: body.firstName,
      lastName: body.lastName,

    })
      .then((user) => {
        user.onlineAvailability = 1;
        var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
        
        });
      
        handleResponse(res, {
          user,
          accessToken: token,
        });
      })
      .catch((err) => {
        handleError(res, err);
      });
  });
};





