const express = require("express");
const { signup, allTasks, createTask, particularTask, updateTask } = require("../controller/adminController");
const adminRoutes = express.Router();

adminRoutes.post("/signup", signup);
adminRoutes.post("/assign_task", createTask);
adminRoutes.get("/all_tasks", allTasks);
adminRoutes.get("/task/:id",particularTask);
adminRoutes.put("/edit_task/:id",updateTask)

module.exports = adminRoutes;