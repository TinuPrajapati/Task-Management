const express = require("express");
const authenticate = require("../middleware/jwtManager");
const { signup, login, logout, particularRoleUser, allUser, User, particularUser } = require("../controller/userController");
const userRoutes = express.Router();
const { upload } = require("../lib/cloudinaryConfig");

userRoutes.get("/check", authenticate,User);
userRoutes.get("/all", authenticate,allUser);
userRoutes.get("/single/:name", authenticate, particularUser);
userRoutes.get("/:role", authenticate, particularRoleUser);
userRoutes.post("/signup", authenticate,upload.single("image"),signup);
userRoutes.post("/login",login);
userRoutes.post("/logout", authenticate,logout);

module.exports = userRoutes;