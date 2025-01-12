const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.mailer_host,
  port: parseInt(process.env.mailer_port), 
  secure: process.env.mailer_port,
  auth: {
    user: process.env.mailer_email,
    pass: process.env.mailer_password,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

// Main function to send emails
async function main(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"Task Manager Team" <${process.env.mailer_email}>`, // Sender address
      to, // Receiver address
      subject, // Email subject
      html, // Email content (HTML)
    });

    return info;
  } catch (error) {
    return error;
  }
}

module.exports = main;
