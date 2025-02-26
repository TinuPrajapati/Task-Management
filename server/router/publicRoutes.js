const express = require("express");
const {
  login,
  data,
  Projects,
  ProjectStatus,
  deleteProject,
  sendEmail,
  logout,
  createTodo,
  getTodo,
  deleteTodo,
} = require("../controller/publicController");
const authenticate = require("../middleware/jwtManager");
const { createAssignedTodo } = require("../controller/AssignedTodoController");
const publicRoutes = express.Router();

publicRoutes.post("/login", login);
publicRoutes.get("/logout", logout);
publicRoutes.get("/protected-route", authenticate, data);
publicRoutes.get("/:name/tasks", Projects);
publicRoutes.put("/task/status", ProjectStatus);
publicRoutes.delete("/task/:id", deleteProject);

// Self todos
publicRoutes.get("/todos",authenticate,getTodo);
publicRoutes.post("/create_self_todo", authenticate, createTodo);
publicRoutes.delete("/delete_self_todo/:id",authenticate,deleteTodo);

// Assigned todos
// publicRoutes.get("/assigned_tasks", authenticate, data);
// publicRoutes.get("/assigned_tasks/:id", authenticate, data);
publicRoutes.post("/create_assigned_tasks", authenticate,createAssignedTodo);
// publicRoutes.delete("/assigned_tasks/:id", authenticate, data);

// Email send
publicRoutes.post("/send_mail", authenticate, sendEmail);

module.exports = publicRoutes;
