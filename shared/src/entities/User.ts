import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { TodoItem } from "./TodoItem";

class SavedUser extends TimeStamps {
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
  role: string;

  @prop()
  password: string;

  @prop({ ref: () => TodoItem })
  todoItems: Ref<TodoItem>[];
}

export type User = SavedUser & {
  _id: mongoose.Types.ObjectId;
}

export const UserModel = getModelForClass(SavedUser);
