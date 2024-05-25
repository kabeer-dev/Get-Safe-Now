const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const { login, signUp} = require("../../controllers/auth.js");
const { validateRequest } = require("../../middleware/validateRequest.js");

router.post(
  "/login",
  [
    body("email").notEmpty().withMessage("Email is required"),

    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  login
);

router.post(
  "/sign-up",
  [
    body("firstName").notEmpty().withMessage("firstName is required"),
    body("lastName").notEmpty().withMessage("lastName is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("confirmPassword").notEmpty().withMessage("Confirm Password is required"),
  ],
  validateRequest,
  signUp
);


module.exports = router;
