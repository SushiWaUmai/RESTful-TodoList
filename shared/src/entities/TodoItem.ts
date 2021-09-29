import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class TodoItem extends TimeStamps {
  @prop()
  title: string;

  @prop()
  description: string;

  @prop()
  done: boolean;

  @prop()
  dueDate?: Date;
}

export const TodoItemModel = getModelForClass(TodoItem);
