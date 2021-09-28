import { UserTodoItemResponse } from "@shared/SharedTypes";
import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { TodoItem } from "@shared/entities/TodoItem";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import TodoItemDisplay from "./TodoItemDisplay";

interface TodoListDisplayProps {}

const TodoListDisplay: FunctionComponent<TodoListDisplayProps> = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getTodos = async () => {
      let data: UserTodoItemResponse = (
        await axios.get("http://localhost:4000/todos", {
          withCredentials: true,
        })
      )?.data;
      if (!data?.error && data.todos) {
        setTodos(data.todos);
      } else {
        router.push("/login");
      }
    };
    getTodos();
  }, [router]);

  let todoMap = null;
  if (todos.length > 0) {
    todoMap = todos
      .map((todo, i) => {
        return <TodoItemDisplay key={i} todoItem={todo} />;
      })
      .reduce((prev, current) => {
        return (
          <>
            {prev}
            {current}
          </>
        );
      });
  }

  return (
    <div className="flex-grow mx-3 p-5">
      <ul>{todoMap}</ul>
    </div>
  );
};

export default TodoListDisplay;
