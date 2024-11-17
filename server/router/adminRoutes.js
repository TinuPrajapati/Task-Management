const express = require("express");
const { signup, task, showTasks } = require("../controller/adminController");
const adminRoutes = express.Router();

adminRoutes.post("/signup",signup);
adminRoutes.post("/assign_task",task);
// adminRoutes.get("/tasks",showTasks)

module.exports = adminRoutes;