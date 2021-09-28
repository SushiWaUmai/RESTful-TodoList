import { getModelForClass, prop } from "@typegoose/typegoose";

export class TodoItem {
  @prop()
  title: string;

  @prop()
  description: string;

  @prop()
  dueDate: Date;
}

export const TodoItemModel = getModelForClass(TodoItem);
