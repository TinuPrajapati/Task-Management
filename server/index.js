require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// const errorHandler = require("./handler/errorHandler");
const adminRoutes = require("./router/adminRoutes");
const publicRoutes = require("./router/publicRoutes");
const cookieParser = require("cookie-parser");
const chatRouter = require("./router/chatRoutes");
const {app,server} = require("./lib/socket.js");
const selfTodoRoutes = require("./router/selfTodoRoutes.js");
const assignedTodoRoutes = require("./router/AssignedTodoRoutes.js");

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
app.use("/admin",adminRoutes);
app.use("/chats",chatRouter);
app.use("/selftodos", selfTodoRoutes);
app.use("/assignedtodos", assignedTodoRoutes);

// Start the server
server.listen(8000, () => {
  console.log("Server started on port 8000");
});
