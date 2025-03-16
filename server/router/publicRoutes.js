const express = require("express");
const {
  data,
  sendEmail,
} = require("../controller/publicController");
const authenticate = require("../middleware/jwtManager");
const publicRoutes = express.Router();

publicRoutes.get("/protected-route", authenticate, data);

// Email send
publicRoutes.post("/send_mail", authenticate, sendEmail);

module.exports = publicRoutes;
