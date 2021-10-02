import { User } from "@shared/entities/User";
import { readFileSync } from "fs";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { EMAIL_PASSWORD, EMAIL_USER } from "src/constants";
import hogan from "hogan.js";
import path from "path";
import juice from "juice";
import { Verification } from "@shared/entities/Verification";

const getTemplate = (templatePath: string) => {
  let cssData = readFileSync(
    path.join(__dirname, "/../templates/style.css"),
    "utf-8"
  );

  let htmlData = readFileSync(path.join(__dirname, templatePath), "utf-8");
  let juiced = juice(htmlData, { extraCss: cssData });

  return hogan.compile(juiced);
};

export const sendVerificationMail = (
  user: User,
  verification: Verification
) => {
  const { email } = user;

  let template = getTemplate("/../templates/Verify.hjs");

  sendMail(
    `Hello ${user.username}, please verify your email adress`,
    template.render({ user, verification }),
    email
  );

  // http://localhost:3000/verify?userrole=${user.role}
};

export const sendForgotPassworldMail = (
  user: User,
  verification: Verification
) => {
  const { email } = user;

  let template = getTemplate("/../templates/ForgotPassword.hjs");

  sendMail(
    `Hello ${user.username}, you requested a password reset`,
    template.render({ user, verification }),
    email
  );
};

const sendMail = (subject: string, html: string, email: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  var mailOptions: Mail.Options = {
    from: EMAIL_USER,
    to: email,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error(error);
    else console.log(`Email sent: ${info.response}`);
  });
};
