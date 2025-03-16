const express = require("express");
const authenticate = require("../middleware/jwtManager");
const { createProject, allProjects, updateProject, projectByUser, deleteProject } = require("../controller/projectController");
const projectRoutes = express.Router();
const {upload} = require("../lib/cloudinaryConfig.js")

projectRoutes.get("/all",authenticate, allProjects);
projectRoutes.get("/",authenticate,projectByUser );
projectRoutes.post("/add",authenticate,upload.array("file",10), createProject);
projectRoutes.put("/update_project/:id",authenticate,updateProject)
projectRoutes.delete("/delete/:id",authenticate,deleteProject)

module.exports = projectRoutes;