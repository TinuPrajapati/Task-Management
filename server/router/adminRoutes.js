const express = require("express");
const { signup, allTasks, createTask, particularTask, updateTask, Users, allUser, deleteUser, favoriteUser } = require("../controller/adminController");
const authenticate = require("../middleware/jwtManager");
const adminRoutes = express.Router();

// tasks routes
adminRoutes.post("/assign_task",authenticate, createTask);
adminRoutes.get("/all_tasks",authenticate, allTasks);
adminRoutes.get("/task/:id",particularTask);
adminRoutes.put("/edit_task/:id",updateTask)

// users routes
adminRoutes.get("/all_users",authenticate,allUser)
adminRoutes.post("/signup", signup);
adminRoutes.post("/users",Users);
adminRoutes.put("/user_favorite",authenticate,favoriteUser)
adminRoutes.delete("/delete_user/:id",authenticate,deleteUser)

module.exports = adminRoutes;