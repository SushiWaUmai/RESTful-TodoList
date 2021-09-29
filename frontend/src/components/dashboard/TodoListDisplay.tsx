import { UserTodoItemResponse } from "@shared/SharedTypes";
import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { TodoItem } from "@shared/entities/TodoItem";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import TodoItemDisplay from "./TodoItemDisplay";
import useModal, { ModalAttributes } from "../../hooks/useModal";
import TodoItemModal from "./TodoItemModal";

interface TodoListDisplayProps {}

const TodoListDisplay: FunctionComponent<TodoListDisplayProps> = ({}) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [selected, setSelected] = useState<TodoItem>();
  const todoModal = useModal();
  const router = useRouter();

  const handleEdit = (todoItem: TodoItem) => {
    setSelected(todoItem);
    todoModal.open();
  };

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
          <TodoItemDisplay
            key={i}
            todoItem={todo}
            onDoubleClick={() => handleEdit(todo)}
          />
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
    <div className="flex-grow mx-3 p-5">
      <ul>{todoMap}</ul>
      <TodoItemModal
        modalTitle="Edit TodoItem"
        buttonLabel="Edit Todo"
        initialValues={selected}
        todoModal={todoModal}
      />
    </div>
  );
};

export default TodoListDisplay;
