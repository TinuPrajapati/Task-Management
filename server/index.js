require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const errorHandler = require("./handler/errorHandler");
const adminRoutes = require("./router/adminRoutes");
const publicRoutes = require("./router/publicRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.frontend_url,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const onlineDB = process.env.mongodb_altas

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

// Start the server
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
