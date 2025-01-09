const express = require("express");
const { signup, allTasks, createTask, particularTask, updateTask, User, allUser, deleteUser, favoriteUser, updateUser, particularRoleUser } = require("../controller/adminController");
const authenticate = require("../middleware/jwtManager");
const adminRoutes = express.Router();

// tasks routes
adminRoutes.post("/assign_task",authenticate, createTask);
adminRoutes.get("/all_tasks",authenticate, allTasks);
adminRoutes.get("/task/:id",particularTask);
adminRoutes.put("/edit_task/:id",updateTask)

// users routes
adminRoutes.get("/all_users",authenticate,allUser)
adminRoutes.get("/users/:role",authenticate,particularRoleUser)
adminRoutes.post("/signup", signup);
adminRoutes.get("/user/:id",User);
adminRoutes.put("/user_favorite",authenticate,favoriteUser)
adminRoutes.put("/update_details/:id",authenticate,updateUser)
adminRoutes.delete("/delete_user/:id",authenticate,deleteUser)

module.exports = adminRoutes;