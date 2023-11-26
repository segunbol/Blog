const nodemailer = require("nodemailer");
const dotenv = require("dotenv")

dotenv.config()


const sendEmail = async (email, subject, link, username) => {
    console.log(email, subject, username, link)
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "segunbolawole91@gmail.com",
        pass: "ocgp epxe cuux yjde",
      },
      tls: {
        // This option allows you to disable certificate verification
        rejectUnauthorized: false,
      },
    });
// console.log(process.env.HOST)
    await transporter.sendMail({
      from: '"Shoboloyoke" "segunbolawole88@gmail.com"',
      to: email,
      subject: subject,
      html: 
      `<div>
        <p>Dear ${username},</p>
        <p>
          Thank you for signing up for an account, Kindly click the link below to verify your email
        </p>
        <a href="${link}">Click Here</a>
      </div>`,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error.message);
  }
};

module.exports = sendEmail;