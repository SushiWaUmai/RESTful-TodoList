import { TodoItem } from "@shared/entities/TodoItem";
import { TodoItemResponse } from "@shared/SharedTypes";
import axios from "axios";
import { FormikHelpers } from "formik";
import { useRouter } from "next/dist/client/router";
import {
  Dispatch,
  FunctionComponent,
  HTMLAttributes,
  SetStateAction,
} from "react";
import useModal from "../../hooks/useModal";
import { toErrorMap } from "../../utils/ToErrorMap";
import ButtonComponent from "../ButtonComponent";
import TodoItemModal from "./TodoItemModal";

type TodoManageContextProps = HTMLAttributes<HTMLDivElement> & {
  showCompleted: boolean;
  getTodos: () => Promise<void>;
  toogleShowCompleted: () => void;
};

const TodoManageContext: FunctionComponent<TodoManageContextProps> = (
  props
) => {
  const todoModal = useModal();

  const { showCompleted, getTodos, toogleShowCompleted, ...divProps } = props;
  const handleSubmit = async (
    values: TodoItem,
    { setErrors, setSubmitting }: FormikHelpers<TodoItem>
  ) => {
    let data: TodoItemResponse = await (
      await axios.post("http://localhost:4000/todos/", values, {
        withCredentials: true,
      })
    )?.data;
    if (data?.error) {
      setErrors(toErrorMap(data.error));
    } else {
      setSubmitting(false);
      await getTodos();
    }
  };

  return (
    <div {...divProps}>
      <ButtonComponent
        onClick={todoModal.open}
        className="m-5 p-4 rounded bg-gradient-to-br from-green-500 to-red-500"
      >
        Create Todo
      </ButtonComponent>
      <br />

      {showCompleted ? (
        <ButtonComponent
          onClick={toogleShowCompleted}
          className="m-5 p-4 rounded bg-gradient-to-tr from-purple-500 to-red-400"
        >
          Hide Completed
        </ButtonComponent>
      ) : (
        <ButtonComponent
          onClick={toogleShowCompleted}
          className="m-5 p-4 rounded bg-gradient-to-tr from-green-500 to-blue-400"
        >
          Show Completed
        </ButtonComponent>
      )}
      <TodoItemModal
        modalTitle="Create TodoItem"
        buttonLabel="Create Todo"
        todoModal={todoModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default TodoManageContext;
