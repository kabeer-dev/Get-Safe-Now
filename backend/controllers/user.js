const { handleResponse, handleError } = require("../utils/responses.js");
const bcrypt = require("bcrypt");

exports.changeDisplayName = (req, res) =>{
  req.user.update(
    {displayName: req.body.displayName}
  ).then( (user) =>{
    handleResponse(res, {
      user,
    });
  }
  )
}

exports.changeOnlineAvailability = (req, res) =>{
  req.user.update(
    {onlineAvailability: req.body.onlineAvailability}
    ).then( (user) =>{
      handleResponse(res, {
        user,
      });
    }
    )
  }

exports.changePassword = (req, res) => {
  var passwordIsValid = bcrypt.compareSync(
    req.body.oldPassword,
    req.user.password
  );
  var newpasswordIsValid = bcrypt.compareSync(
    req.body.newPassword,
    req.user.password
  );
  if (!passwordIsValid) {
    console.log('jjj')
    return handleError(res, " Please Enter Correct Old Password", 200);
    
  }else if(newpasswordIsValid){
    return handleError(res, " You Enter Your Old Password as New Password", 200);
  }
  req.user 
    .update({
      password: bcrypt.hashSync(req.body.newPassword, 8),
    })
    .then(handleResponse(res, null, 200, "Password Changed Successfully" ));
}

exports.changePicture = (req, res) =>{
  req.user.update(
    {
      avatar: req.file.filename
    }
  ).then(
    handleResponse(res, req.file.filename, 200, "Image Upload Successfully" )
  )
  
}




