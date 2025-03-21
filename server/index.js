require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {app,server} = require("./lib/socket.js");

const publicRoutes = require("./router/publicRoutes");
const chatRouter = require("./router/chatRoutes");
const selfTodoRoutes = require("./router/selfTodoRoutes.js");
const assignedTodoRoutes = require("./router/AssignedTodoRoutes.js");
const projectRoutes = require("./router/projectRoutes.js");
const userRoutes = require("./router/userRoutes.js");
const emailRoutes = require("./router/emailRoutes.js");
const teamRoutes = require("./router/teamRoutes.js");

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const onlineDB = process.env.ONLINE_DB

// MongoDB connection
async function main() {
  try {
    await mongoose.connect(onlineDB);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
main();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/",publicRoutes);
app.use("/users",userRoutes);
app.use("/chats",chatRouter);
app.use("/selftodos", selfTodoRoutes);
app.use("/assignedtodos", assignedTodoRoutes);
app.use("/projects", projectRoutes);
app.use("/emails",emailRoutes)
app.use("/teams",teamRoutes)

// Start the server
server.listen(8000, () => {
  console.log("Server started on port 8000");
});
