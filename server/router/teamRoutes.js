const express = require("express");
const authenticate = require("../middleware/jwtManager.js");
const { getTeam, addTeam, updateTeam, deleteTeam } = require("../controller/teamController");
const teamRoutes = express.Router();
const {upload} = require("../lib/cloudinaryConfig.js")

teamRoutes.get("/", authenticate, getTeam);
teamRoutes.post("/add", authenticate,upload.array("file",10), addTeam);
teamRoutes.put("/update/:id", authenticate, updateTeam);
teamRoutes.delete("/delete/:id", authenticate, deleteTeam);

module.exports = teamRoutes;