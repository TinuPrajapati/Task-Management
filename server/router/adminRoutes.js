const express = require("express");
const { signup, User, allUser, deleteUser, favoriteUser, updateUser, particularRoleUser, createProject, allProjects, particularProject, updateProject, deleteProject, favoriteProject } = require("../controller/adminController");
const authenticate = require("../middleware/jwtManager");
const adminRoutes = express.Router();
const {upload} = require("../lib/cloudinaryConfig")

// tasks routes
adminRoutes.post("/assign_project",authenticate, createProject);
adminRoutes.get("/all_projects",authenticate, allProjects);
adminRoutes.get("/particular_project/:id",authenticate, particularProject);
adminRoutes.put("/update_project/:id",authenticate,updateProject)
adminRoutes.put("/favorite",authenticate,favoriteProject)
adminRoutes.delete("/project/:id",authenticate,deleteProject)

// users routes
adminRoutes.get("/all_users",authenticate,allUser)
adminRoutes.get("/users/:role",authenticate,particularRoleUser)
adminRoutes.post("/register",authenticate,upload.single("photo"), signup);
adminRoutes.get("/check",authenticate,User);
adminRoutes.put("/user_favorite",authenticate,favoriteUser)
adminRoutes.put("/update_details/:id",authenticate,updateUser)
adminRoutes.delete("/delete_user/:id",authenticate,deleteUser)

module.exports = adminRoutes;