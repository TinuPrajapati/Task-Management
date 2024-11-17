const nodemailer = require("nodemailer")

const emailManager = async (user_name, email, password, admin_name, role) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "27d905761b30e7",
      pass: "83c2c518371868",
    },
  });

  const info = await transporter.sendMail({
    from: `${admin_name}`, // sender address
    to: email, // list of receivers
    subject: "Your company Id and password", // Subject line
    html: `<div class="container">
        <div class="header">Dear ${user_name},</div>
        <div class="content">
            This is a test email generated using Mailtrap to simulate sending credentials to a user. Below are the credentials for accessing the <strong>{{system_name}}</strong>:
            <br><br>
            <strong>Credentials:</strong>
            <ul>
                <li><strong>Company ID:</strong> ${email}</li>
                <li><strong>Password:</strong> ${password}</li>
                <li><strong>Role:</strong> ${role}</li>
            </ul>
            <h3>Testing Instructions:</h3>
            <ol>
                <li>Open the Company Website.</li>
                <li>Enter the provided Company ID and Password.</li>
                <li>Verify that the login functionality and credential validation work as expected.</li>
            </ol>
            <div class="note">
                <strong>Note:</strong> This email is intended for testing purposes only and should not be used in a live environment. If you notice any issues or require assistance, contact the development team at <a href="mailto:{{support_email}}">{{support_email}}</a>.
            </div>
        </div>
        <div class="footer">
            Best regards,<br>
            ${admin_name}<br>
            Admin<br>
        </div>
    </div>`, // html body
  });
  console.log("Message sent: %s", info.messageId);
};

module.exports = emailManager;