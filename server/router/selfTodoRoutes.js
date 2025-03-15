const express = require("express");
const authenticate = require("../middleware/jwtManager");
const { createTodo , getTodo, deleteTodo } = require("../controller/selfTodoController");
const selfTodoRoutes  = express.Router();

selfTodoRoutes.get("/",authenticate,getTodo);
selfTodoRoutes.post("/add",authenticate,createTodo);
selfTodoRoutes.delete("/delete/:id",authenticate,deleteTodo);

module.exports = selfTodoRoutes;