import "module-alias/register";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { userRouter } from "./routers/UserRouter";
import { todoItemRouter } from "./routers/TodoItemRouter";
import session from "express-session";
import { mongoose } from "@typegoose/typegoose";
import {
  COOKIE_NAME,
  DATABASE_NAME,
  FRONTEND_URI,
  MONGO_URI,
  PORT,
  SESSION_SECRET,
  __prod__,
} from "./Constants";
import MongoStore from "connect-mongo";

async function main() {
  console.log("Starting Server...");
  const app = express();

  mongoose.connect(MONGO_URI + "/" + DATABASE_NAME, () =>
    console.log("MongoDB connected")
  );

  console.log(`Setting CORS origin to ${FRONTEND_URI}`);
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );
  app.use(morgan("tiny"));

  app.use(
    session({
      name: COOKIE_NAME,
      secret: SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      store: MongoStore.create({
        mongoUrl: MONGO_URI,
        dbName: "Sessions",
        collectionName: "RESTful-todolist",
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        sameSite: "lax",
        httpOnly: true,
        secure: __prod__,
      },
    })
  );

  app.use(express.json());

  app.use("/user", userRouter);
  app.use("/todos", todoItemRouter);

  app.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}`)
  );
}

main();
