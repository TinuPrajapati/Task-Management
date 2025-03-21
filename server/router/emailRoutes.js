const express = require("express");
const authenticate = require("../middleware/jwtManager");
const { sendOffice, sendOther, getEmail } = require("../controller/emailController");
const emailRoutes = express.Router();

emailRoutes.get("/", authenticate,getEmail);    
emailRoutes.post("/office", authenticate,sendOffice);    
emailRoutes.post("/other", authenticate,sendOther);    

module.exports = emailRoutes;