import {
  GenericResponse,
  TodoItemResponse,
  UserTodoItemResponse,
} from "@shared/SharedTypes";
import { FunctionComponent, HTMLAttributes, useEffect, useState } from "react";
import axios from "axios";
import { TodoItem } from "@shared/entities/TodoItem";
import { useRouter } from "next/dist/client/router";
import TodoItemDisplay from "./TodoItemDisplay";
import useModal from "../../hooks/useModal";
import TodoItemModal from "./TodoItemModal";

type TodoListDisplayProps = HTMLAttributes<HTMLDivElement> & {
  showCompleted: boolean;
};

const TodoListDisplay: FunctionComponent<TodoListDisplayProps> = (props) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [selected, setSelected] = useState<TodoItem>();
  const todoModal = useModal();
  const router = useRouter();

  const { showCompleted } = props;

  const handleEdit = async (val: TodoItem) => {
    console.log(val);
    let data: GenericResponse = await (
      await axios.put("http://localhost:4000/todos/", val, {
        withCredentials: true,
      })
    )?.data;
    if (!data?.error) {
      router.push("/dashboard");
    }
  };

  const openEditModal = (todoItem: TodoItem) => {
    setSelected(todoItem);
    todoModal.open();
  };

  const handleToogleCheck = (todoItem: TodoItem) => {
    todoItem.done = !todoItem.done;
    handleEdit(todoItem);
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
        if (showCompleted || !todo.done) {
          return (
            <TodoItemDisplay
              key={i}
              todoItem={todo}
              handleEdit={() => openEditModal(todo)}
              toogleCheck={() => handleToogleCheck(todo)}
            />
          );
        }
        return null;
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
    <div {...props}>
      <div className="mx-3 p-5">
        <ul>{todoMap}</ul>
        <TodoItemModal
          modalTitle="Edit TodoItem"
          buttonLabel="Edit Todo"
          initialValues={selected}
          todoModal={todoModal}
          onSubmit={handleEdit}
        />
      </div>
    </div>
  );
};

export default TodoListDisplay;
