const express = require("express");
const { tasks, login, taskStatus, allTask, deleteTask } = require("../controller/publicController");
const publicRoutes = express.Router();

publicRoutes.post("/login",login);
publicRoutes.get("/:name/tasks",tasks);
publicRoutes.get("/alltasks",allTask)
publicRoutes.put("/task/status",taskStatus)
publicRoutes.delete("/task/:id",deleteTask)

module.exports= publicRoutes;