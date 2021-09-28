import { UserTodoItemResponse } from "@shared/SharedTypes";
import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { TodoItem } from "@shared/entities/TodoItem";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";

interface TodoDisplayProps {}

const TodoDisplay: FunctionComponent<TodoDisplayProps> = () => {
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
        return (
          <motion.li
            key={i}
            className="p-3 my-3 bg-gradient-to-b from-black to-gray-800 rounded-lg"
          >
            <div>
              <p>
                <b>{todo.title}</b>
              </p>
              <br />
              <p>{todo.description}</p>
            </div>
          </motion.li>
        );
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
    <div className="p-3">
      <ul>{todoMap}</ul>
    </div>
  );
};

export default TodoDisplay;
