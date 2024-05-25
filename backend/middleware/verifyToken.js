const jwt = require("jsonwebtoken");
const { handleError } = require("../utils/responses.js");
const { User } = require("../models");

exports.verifyToken = (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let token = authHeader?.substring(7, authHeader.length);

  if (!token) {
    return handleError(res, "No token provided!", 403);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return handleError(res, "Unauthorized!", 401);
    }

    User.findByPk(decoded.id)
    .then(async (user) => {
      req.user = user;
      req.userId = decoded.id;
      next();
    })
    .catch((err) => {
      return handleError(res, "Unauthorized!", 401);
    });
  });
};
