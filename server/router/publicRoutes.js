const express = require("express");
const {
  login,
  data,
  sendEmail,
  logout,
} = require("../controller/publicController");
const authenticate = require("../middleware/jwtManager");
const publicRoutes = express.Router();

publicRoutes.post("/login", login);
publicRoutes.get("/logout", logout);
publicRoutes.get("/protected-route", authenticate, data);

// Email send
publicRoutes.post("/send_mail", authenticate, sendEmail);

module.exports = publicRoutes;
