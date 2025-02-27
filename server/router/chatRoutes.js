const express = require("express");
const authenticate = require("../middleware/jwtManager");
const { getMessage, sendMessage } = require("../controller/chatController");
const chatRouter = express.Router();
const { chatUpload } = require("../lib/cloudinaryConfig");

chatRouter.get("/:id", authenticate, getMessage);
chatRouter.post(
  "/send/:id",
  authenticate,
  chatUpload.single("image"),
  sendMessage
);

module.exports = chatRouter;
