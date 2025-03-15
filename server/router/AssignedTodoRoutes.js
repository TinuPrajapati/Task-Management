const express = require("express");
const authenticate = require("../middleware/jwtManager");
const { createTodo, showTodos, deleteTodo, showAllTodos, updateTodo } = require("../controller/assignedTodosController");
const assignedTodoRoutes = express.Router();

// Assigned todos
assignedTodoRoutes.get("/", authenticate,showTodos);
assignedTodoRoutes.get("/all", authenticate,showAllTodos);
assignedTodoRoutes.post("/add", authenticate, createTodo);
assignedTodoRoutes.put("/update", authenticate, updateTodo);
assignedTodoRoutes.delete("/delete/:id", authenticate,deleteTodo);

module.exports = assignedTodoRoutes;