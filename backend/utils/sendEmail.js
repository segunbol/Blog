const nodemailer = require("nodemailer");
const dotenv = require("dotenv")

dotenv.config()


const sendEmail = async (email, subject, text) => {
    console.log(email, subject, text)
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
    //   secure: true,
      auth: {
        user: "lexie.corwin47@ethereal.email",
        pass: "1XVdSZKzXngxKrZuCs",
      },
    });
console.log(process.env.HOST)
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error.message);
  }
};

module.exports = sendEmail;