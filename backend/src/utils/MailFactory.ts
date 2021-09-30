import { User } from "@shared/entities/User";
import { readFileSync } from "fs";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { EMAIL_PASSWORD, EMAIL_USER } from "src/constants";
import hogan from "hogan.js";
import path from "path";
import juice from "juice";

let htmlData = readFileSync(
  path.join(__dirname, "/../templates/Verify.hjs"),
  "utf-8"
);
let cssData = readFileSync(
  path.join(__dirname, "/../templates/style.css"),
  "utf-8"
);
let juiced = juice(htmlData, { extraCss: cssData });
const template = hogan.compile(juiced);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

export const sendVerificationMail = async (user: User) => {
  const { email } = user;

  var mailOptions: Mail.Options = {
    from: EMAIL_USER,
    to: email,
    subject: "Test",
    html: template.render({ user }),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error(error);
    else console.log(`Email sent: ${info.response}`);
  });
  // http://localhost:3000/verify?userrole=${user.role}
};
