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

    res.status(200).json({ messages });
  } catch (error) {
    console.loh("Error come from Get Message Route :", error);
    res.status(500).json({ message: "Error! Please try again" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const receriverId = req.params.id;
    const senderId = req.user.userId;
    const { message } = req.body;
    let path;
    if (req.file) {
      path = req.file.path;
    }
    const newMessage = new Message({
      senderId,
      receriverId,
      message,
      image: path,
    });
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.loh("Error come from Get Message Route :", error);
    res.status(500).json({ message: "Error! Please try again" });
  }
};
