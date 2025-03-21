const main = require("../middleware/emailManager");
const Email = require("../models/emailModel");
const User = require("../models/usersModel");

exports.sendOffice = async (req, res) => {
  const { userId } = req.user;
  const { role, name, email, subject, msg } = req.body;
  try {
    const user = await User.findOne({ name }).select("_id name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newEmail = new Email({
      role,
      senderId: userId,
      email,
      subject,
      message: msg,
      receiverId: user._id,
    });
    await newEmail.save();
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.log("Error come in send office routes", error);
    res
      .status(500)
      .json({ message: "Internal server error, Please try again!" });
  }
};

exports.sendOther = async (req, res) => {
  const { userId } = req.user;
  const { name, email, subject, msg } = req.body;
  try {
    const newEmail = new Email({
      role:"Other Person",
      senderId: userId, 
      email,
      subject,
      message: msg,
      receiverId: userId,
    });
    await newEmail.save();
    await main(email, subject, msg);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.log("Error come in send other routes", error);
    res
      .status(500)
      .json({ message: "Internal server error, Please try again!" });
  }
};

exports.getEmail = async (req, res) => {
  const { userId } = req.user;
  try {
    const email = await Email.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .populate("senderId", "_id name email role image")
      .populate("receiverId", "_id name email role image");
    res.status(200).json(email);
  } catch (error) {
    console.log("Error come in Get Email routes", error);
    res
      .status(500)
      .json({ message: "Internal server error, Please try again!" });
  }
};
