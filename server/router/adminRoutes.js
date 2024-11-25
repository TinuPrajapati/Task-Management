const express = require("express");
const { signup, allTasks, createTask, particularTask, updateTask, Users, allUser } = require("../controller/adminController");
const authenticate = require("../middleware/jwtManager");
const adminRoutes = express.Router();

adminRoutes.post("/signup", signup);
adminRoutes.post("/assign_task", createTask);
adminRoutes.get("/all_tasks", allTasks);
adminRoutes.get("/task/:id",particularTask);
adminRoutes.get("/all_users",allUser)
adminRoutes.post("/users",Users);
adminRoutes.put("/edit_task/:id",updateTask)

module.exports = adminRoutes;