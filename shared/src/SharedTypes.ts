import { TodoItem } from "./entities/TodoItem";
import { User } from "./entities/User";
import { FieldError } from "./utils/Error";

export type UserNoID = Omit<User, "_id">;
export type UserNoPassword = Omit<UserNoID, "password">;

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
  user?: UserNoPassword;
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

export interface GenericResponse {
  error?: Error;
}

export interface ChangePasswordInput {
  uuid: string;
  newPassword: string;
}