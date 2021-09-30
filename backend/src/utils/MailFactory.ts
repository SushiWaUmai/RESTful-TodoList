import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { EMAIL_NAME as EMAIL_USER, EMAIL_PASSWORD } from "src/Constants";

export const mailUser = (email: string) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
    secure: true,
  });

  var mailOptions: Mail.Options = {
    from: EMAIL_USER,
    to: email,
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
