const express = require("express");
const authenticate = require("../middleware/jwtManager");
const { createTodo, showTodos, deleteTodo } = require("../controller/assignedTodosCOntroller");
const assignedTodoRoutes = express.Router();

// Assigned todos
assignedTodoRoutes.get("/", authenticate,showTodos);
assignedTodoRoutes.get("/:id", authenticate);
assignedTodoRoutes.post("/create", authenticate, createTodo);
assignedTodoRoutes.delete("/delete/:id", authenticate,deleteTodo);

module.exports = assignedTodoRoutes;