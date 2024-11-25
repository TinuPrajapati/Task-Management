const express = require("express");
const { tasks, login, taskStatus, deleteTask, data } = require("../controller/publicController");
const authenticate = require("../middleware/jwtManager");
const publicRoutes = express.Router();

publicRoutes.post("/login",login);
publicRoutes.get("/protected-route",authenticate,data);
publicRoutes.get("/:name/tasks",tasks);
publicRoutes.put("/task/status",taskStatus)
publicRoutes.delete("/task/:id",deleteTask)

module.exports= publicRoutes;