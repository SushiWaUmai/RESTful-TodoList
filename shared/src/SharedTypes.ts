import { TodoItem } from "./entities/TodoItem";
import { User } from "./entities/User";
import { FieldError } from "./utils/Error";

export interface TodoItemResponse {
  todo?: TodoItem;
  error?: FieldError[];
}

export interface UserTodoItemResponse {
  user?: User;
  todos?: TodoItem[];
  error?: FieldError[];
}

export interface UserResponse {
  user?: User;
  error?: FieldError[];
}

export interface UserLoginInput {
  usernameOrEmail: string;
  password: string;
}

export interface UserRegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface UserDeleteInput {
  username: string;
  password: string;
}

export interface SuccessResponse {
  error?: Error;
}
