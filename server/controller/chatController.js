const { getReceivedSocketId , io } = require("../lib/socket.js");
const Message = require("../models/chatModel.js");

exports.getMessage = async (req, res) => {
  try {
    const userToChatId = req.params.id;
    const myId = req.user.userId;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receriverId: userToChatId },
        { senderId: userToChatId, receriverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.loh("Error come from Get Message Route :", error);
    res.status(500).json({ message: "Error! Please try again" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const receriverId = req.params.id;
    const senderId = req.user.userId;
    const { msg } = req.body;
    let path;
    if (req.file) {
      path = req.file.path;
    }
    const newMessage = new Message({
      senderId,
      receriverId,
      message:msg,
      image: path,
    });
    await newMessage.save();

    // react time functionaliy
    const receiverSocketId = getReceivedSocketId(receriverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error come from Get Message Route :", error.message);
    res.status(500).json({ message: "Error! Please try again" });
  }
};
