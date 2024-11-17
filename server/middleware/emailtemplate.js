const nodemailer = require('nodemailer');

const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <div class="container">
        <div class="header">Dear ${recipient_name},</div>
        <div class="content">
            This is a test email generated using Mailtrap to simulate sending credentials to a user. Below are the credentials for accessing the <strong>{{system_name}}</strong>:
            <br><br>
            <strong>Credentials:</strong>
            <ul>
                <li><strong>Company ID:</strong> ${company_id}</li>
                <li><strong>Password:</strong> ${password}</li>
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
            ${sender_name}<br>
            ${sender_job_title}<br>
            ${company_name}
        </div>
    </div>
</body>
</html>
`;

module.exports = emailTemplate;
