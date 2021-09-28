import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { TodoItem } from "./TodoItem";

export class User extends TimeStamps {
  @prop({
    unique: true,
    validate: (val: string) => val.toLowerCase(),
  })
  username: string;

  @prop({
    unique: true,
    set: (val: string) => val.toLowerCase(),
    get: (val: string) => val,
  })
  email: string;

  @prop()
  role: "UNAUTHORIZED" | "USER" | "ADMIN";

  @prop()
  password: string;

  @prop({ ref: () => TodoItem })
  todoItems: Ref<TodoItem>[];
}

export const UserModel = getModelForClass(User);
