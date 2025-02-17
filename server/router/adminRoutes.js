const express = require("express");
const { signup, User, allUser, deleteUser, favoriteUser, updateUser, particularRoleUser, createProject, allProjects, particularProject, updateProject, deleteProject, favoriteProject, createTodo, showTodos, updateTodo, deleteTodo } = require("../controller/adminController");
const authenticate = require("../middleware/jwtManager");
const adminRoutes = express.Router();

// tasks routes
adminRoutes.post("/assign_project",authenticate, createProject);
adminRoutes.get("/all_projects",authenticate, allProjects);
adminRoutes.get("/particular_project/:id",authenticate, particularProject);
adminRoutes.put("/update_project/:id",authenticate,updateProject)
adminRoutes.put("/favorite",authenticate,favoriteProject)
adminRoutes.delete("/project/:id",authenticate,deleteProject)

// Todo routes
adminRoutes.post("/create_todo",authenticate,createTodo);
adminRoutes.get("/todos/:display",authenticate,showTodos);
adminRoutes.put("/update_todo",authenticate,updateTodo);
adminRoutes.delete("/delete_todo/:id",authenticate,deleteTodo);

// users routes
adminRoutes.get("/all_users",authenticate,allUser)
adminRoutes.get("/users/:role",authenticate,particularRoleUser)
adminRoutes.post("/register", signup);
adminRoutes.get("/user/:id",User);
adminRoutes.put("/user_favorite",authenticate,favoriteUser)
adminRoutes.put("/update_details/:id",authenticate,updateUser)
adminRoutes.delete("/delete_user/:id",authenticate,deleteUser)

module.exports = adminRoutes;