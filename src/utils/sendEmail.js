import nodemailer from "nodemailer";

const sendMail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: html,
    };
    await transporter.sendMail(mailOptions);
    console.log("Message sent");
  } catch (error) {
    return console.log(error);
  }
};
export { sendMail };
