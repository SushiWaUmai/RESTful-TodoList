import { Router } from "express";
import { TodoItemModel } from "@shared/entities/TodoItem";
import { getUser } from "./UserRouter";
import { TodoItemResponse, UserTodoItemResponse } from "@shared/SharedTypes";

export const todoItemRouter = Router();

todoItemRouter.post("/", async (req, res) => {
  if (!req.session.userID) {
    let result: TodoItemResponse = {
      error: [
        {
          field: "user session",
          message: "you must be logged in to create a todo item",
        },
      ],
    };
    res.json(result);
    return;
  }

  const owner = await getUser(req.session.userID);
  if (!owner) {
    let result: TodoItemResponse = {
      error: [
        {
          field: "user",
          message: "session user does not exist",
        },
      ],
    };
    res.json(result);
    return;
  }

  const { title, description } = req.body;

  const item = await TodoItemModel.create({ title, description });
  await item.save();

  owner.todoItems.push(item);
  await owner.save();

  let result: TodoItemResponse = { todo: item };
  res.json(result);
});

todoItemRouter.get("/", async (req, res) => {
  if (!req.session.userID) {
    let result: TodoItemResponse = {
      error: [
        {
          field: "user session",
          message: "you must be logged in to get a todo item",
        },
      ],
    };
    res.json(result);
    return;
  }

  const user = await getUser(req.session.userID);
  if (!user) {
    let result: TodoItemResponse = {
      error: [
        {
          field: "user",
          message: "session user does not exist",
        },
      ],
    };
    res.json(result);
    return;
  }

  const todos = await TodoItemModel.find({
    _id: { $in: user.todoItems },
  }).exec();

  let result: UserTodoItemResponse = { user, todos };
  res.json(result);
});
