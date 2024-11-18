const nodemailer = require("nodemailer")

const emailManager = async (email, admin_name) => {
  const transporter = nodemailer.createTransport({
    host: "gmail",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "tinup2580@gmail.com",
      pass: "fzvr ncuu kbnk xejl",
    },
  });

  const info = await transporter.sendMail({
    from: `${admin_name}`, // sender address
    to: email, // list of receivers
    subject: "Your company Id and password", // Subject line
    text:"Your company id"
  });
  console.log("Message sent: %s", info.messageId);
};

module.exports = emailManager;