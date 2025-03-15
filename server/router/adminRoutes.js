const express = require("express");
const { signup, User, allUser, deleteUser, favoriteUser, updateUser, particularRoleUser } = require("../controller/adminController");
const authenticate = require("../middleware/jwtManager");
const adminRoutes = express.Router();
const {upload} = require("../lib/cloudinaryConfig")

// users routes
adminRoutes.get("/all_users",authenticate,allUser)
adminRoutes.get("/users/:role",authenticate,particularRoleUser)
adminRoutes.post("/register",authenticate,upload.single("photo"), signup);
adminRoutes.get("/check",authenticate,User);
adminRoutes.put("/user_favorite",authenticate,favoriteUser)
adminRoutes.put("/update_details/:id",authenticate,updateUser)
adminRoutes.delete("/delete_user/:id",authenticate,deleteUser)

module.exports = adminRoutes;