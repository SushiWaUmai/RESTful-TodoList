import { User } from "@shared/entities/User";
import { EMAIL_PASSWORD, EMAIL_USER } from "src/Constants";
import { EmailConfig, Mailer } from "nodemailer-react";
import { VerifyEmail } from "./MailTemplate";

const emailConfig: EmailConfig = {
  transport: {
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
    secure: true,
  },
  defaults: {
    from: EMAIL_USER,
  },
};

const mailer = Mailer(emailConfig, { VerifyEmail });

export const mailUser = (user: User) => {
  const { email } = user;

  mailer
    .send(
      "VerifyEmail",
      { user },
      {
        to: email,
      }
    )
};
