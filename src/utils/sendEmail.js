import nodemailer from "nodemailer";

const sendMail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
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
