import argon2 from "argon2";
import { TodoItemModel } from "@shared/entities/TodoItem";
import { Router } from "express";
import mongoose, { Document } from "mongoose";
import { User, UserModel } from "@shared/entities/User";
import {
  GenericResponse,
  UserDeleteInput,
  UserLoginInput,
  UserRegisterInput,
  UserResponse,
} from "@shared/SharedTypes";
import { COOKIE_NAME } from "src/Constants";
import { MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "@shared/Constants";
import { IsEmail } from "@shared/utils/CheckEmail";
import {
  BeAnObject,
  IObjectWithTypegooseFunction,
} from "@typegoose/typegoose/lib/types";
import { makeID } from "src/utils/MakeID";
import { sendVerificationMail } from "src/utils/MailFactory";

export const userRouter = Router();

userRouter.post("/register", async (req, res): Promise<void> => {
  let { username, email, password }: UserRegisterInput = req.body;

  if (username.length < MIN_USERNAME_LENGTH) {
    let result: UserResponse = {
      error: [
        {
          field: "username",
          message: `Username must be at least ${MIN_USERNAME_LENGTH} characters long`,
        },
      ],
    };

    res.json(result);
    return;
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    let result: UserResponse = {
      error: [
        {
          field: "password",
          message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
        },
      ],
    };

    res.json(result);
    return;
  }

  if (!IsEmail(email)) {
    let result: UserResponse = {
      error: [
        {
          field: "email",
          message: "Enter a valid E-Mail",
        },
      ],
    };

    res.json(result);
    return;
  }

  let hashedPassword = await argon2.hash(password);

  // Try to create user, if already exists response with an error
  try {
    const user = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: makeID(32),
    });

    await user.save();

    // Save cookie
    req.session.userID = user._id.valueOf();

    sendVerificationMail(user);

    res.json({ user });
  } catch (error) {
    // Username already exists
    if (error.code === 11000) {
      let result: UserResponse = {
        error: [
          {
            field: "username",
            message: "Username or email already exists",
          },
          {
            field: "email",
            message: "Username or email already exists",
          },
        ],
      };

      res.json(result);
    }
  }
});

userRouter.post("/verify", async (req, res) => {
  let { userrole } = req.body;

  var user:
    | (Document<any, BeAnObject, any> &
        User &
        IObjectWithTypegooseFunction & { _id: any })
    | null = null;

  if (req.session.userID) user = await getUser(req.session.userID);
  else user = await UserModel.findOne({ role: userrole });

  if (!user) {
    let result: GenericResponse = {
      error: {
        name: "User Verification failed",
        message: "Could not find user.",
      },
    };
    res.json(result);
    return;
  }
  if (user.role === "VERIFIED") {
    let result: GenericResponse = {
      error: {
        name: "User already verified",
        message: "This user was already verified.",
      },
    };
    res.json(result);
    return;
  }
  if (user.role !== userrole) {
    let result: GenericResponse = {
      error: {
        name: "User Verification failed",
        message: "Could not verify user",
      },
    };
    res.json(result);
    return;
  }

  user.role = "VERIFIED";
  await user.save();

  let result: GenericResponse = {};
  res.json(result);
});

userRouter.post("/login", async (req, res): Promise<void> => {
  let { usernameOrEmail, password }: UserLoginInput = req.body;

  let user:
    | (Document<any, BeAnObject, any> &
        User &
        IObjectWithTypegooseFunction & { _id: any })
    | null = null;

  if (IsEmail(usernameOrEmail)) {
    user = await UserModel.findOne({ email: usernameOrEmail });
  } else {
    user = await UserModel.findOne({ username: usernameOrEmail });
  }

  // Check in database with username and password

  if (!user) {
    let result: UserResponse = {
      error: [
        {
          field: "usernameOrEmail",
          message: `User with username or E-Mail "${usernameOrEmail}" does not exist`,
        },
      ],
    };

    res.json(result);
    return;
  }

  let valid = await argon2.verify(user.password, password);
  if (!valid) {
    let result: UserResponse = {
      error: [
        {
          field: "password",
          message: "incorrect password",
        },
      ],
    };

    res.json(result);
    return;
  }

  // Save cookie
  req.session.userID = user._id.valueOf();

  user.password = "";
  let result: UserResponse = {
    user,
  };

  res.json(result);
});

userRouter.post("/delete", async (req, res) => {
  const { username, password }: UserDeleteInput = req.body;

  const user = await UserModel.findOne({ username }).exec();

  if (!user) {
    let result: GenericResponse = {
      error: {
        name: "user",
        message: "User not found",
      },
    };
    res.json(result);
    return;
  }

  let valid = await argon2.verify(user.password, password);
  if (!valid) {
    let result: GenericResponse = {
      error: {
        name: "password",
        message: "incorrect password",
      },
    };

    res.json(result);
    return;
  }

  await TodoItemModel.deleteMany({
    _id: { $in: user.todoItems },
  }).exec();

  await UserModel.deleteOne({ username });

  req.session.destroy((err) => {
    res.clearCookie(COOKIE_NAME);
    let result: GenericResponse = {};
    if (err) {
      result.error = err;
    }
    res.json({ result });
  });
});

userRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie(COOKIE_NAME);
    let result: GenericResponse = {};
    if (err) {
      result.error = err;
    }
    res.json({ result });
  });
});

userRouter.get("/me", async (req, res) => {
  // Check for sessions
  if (req.session.userID) {
    const user = await getUser(req.session.userID);
    if (user) {
      res.json({ user });
    } else {
      let result: UserResponse = {
        error: [
          {
            field: "user",
            message: "could not find user from session data",
          },
        ],
      };
      res.json(result);
    }
  } else {
    let result: UserResponse = {
      error: [{ field: "user", message: "could not find user session" }],
    };

    res.json(result);
  }
});

export const getUser = async (userID: string) => {
  return await UserModel.findOne({
    _id: new mongoose.Types.ObjectId(userID),
  });
};
