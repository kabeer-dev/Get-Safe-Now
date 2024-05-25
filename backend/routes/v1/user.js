const express = require("express");
const { body, check } = require("express-validator");
const router = express.Router();
const { validateRequest } = require("../../middleware/validateRequest.js")
const multer = require('multer')
const path = require('path')
const {
  changeDisplayName,
  changeOnlineAvailability,
  changePassword,
  changePicture
} = require("../../controllers/user.js");

router.post(
  '/changeDisplayName',
  [
    body('displayName').notEmpty().withMessage('Display Name is Required')
  ],
  validateRequest,
  changeDisplayName
)

router.post(
  '/changeOnlineAvailability',
  [
    body('onlineAvailability').notEmpty().withMessage('Availability is Required')
  ],
  validateRequest,
  changeOnlineAvailability
)

router.post(
  '/changePassword',
  [
    body('oldPassword').notEmpty().withMessage('Old Password is Required'),
    body('newPassword').notEmpty().withMessage('New Password is Required'),
  ],
  validateRequest,
  changePassword
)



// image upload 
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'public/images')
  },
  filename: (req, file, cb) =>{
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

router.post(
  '/changePicture',
  
  validateRequest,
  upload.single('file'),
  changePicture
)

module.exports = router;
