const express = require("express");
const { login, data, Projects, ProjectStatus, deleteProject } = require("../controller/publicController");
const authenticate = require("../middleware/jwtManager");
const publicRoutes = express.Router();

publicRoutes.post("/login",login);
publicRoutes.get("/protected-route",authenticate,data);
publicRoutes.get("/:name/tasks",Projects);
publicRoutes.put("/task/status",ProjectStatus)
publicRoutes.delete("/task/:id",deleteProject)

module.exports= publicRoutes;