const sgMail = require("@sendgrid/mail");
require("dotenv").config();
console.log("SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const testEmail = async () => {
  try {
    const msg = {
      to: "test@test.com", 
      from: process.env.SENDGRID_FROM_EMAIL, 
      subject: "Test Email from Node.js",
      text: "This is a test email sent from Node.js using SendGrid.",
    };

    await sgMail.send(msg);
    console.log("Test email sent successfully.");
  } catch (err) {
    console.error("Error sending test email:", err);
  }
};

testEmail();
