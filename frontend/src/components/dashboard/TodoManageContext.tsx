import { TodoItem } from "@shared/entities/TodoItem";
import { GenericResponse, TodoItemResponse } from "@shared/SharedTypes";
import axios from "axios";
import { FormikHelpers } from "formik";
import {
  Dispatch,
  FunctionComponent,
  HTMLAttributes,
  SetStateAction,
} from "react";
import useModal from "../../hooks/useModal";
import { SortType } from "../../pages/account/dashboard";
import { toErrorMap } from "../../utils/ToErrorMap";
import ButtonComponent from "../ButtonComponent";
import TodoItemModal from "./TodoItemModal";
import TodoSortListbox from "./TodoSortListbox";

type TodoManageContextProps = HTMLAttributes<HTMLDivElement> & {
  showCompleted: boolean;
  sortBy: SortType;
  setSortBy: Dispatch<SetStateAction<"Date" | "Title">>;
  getTodos: () => Promise<void>;
  toogleShowCompleted: () => void;
};

const TodoManageContext: FunctionComponent<TodoManageContextProps> = (
  props
) => {
  const todoModal = useModal();

  const {
    showCompleted,
    sortBy,
    setSortBy,
    getTodos,
    toogleShowCompleted,
    ...divProps
  } = props;
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

  const handleDeleteAll = async () => {
    let data: GenericResponse = await (
      await axios.delete("http://localhost:4000/todos/deleteAll/", {
        withCredentials: true,
      })
    )?.data;
    if (data?.error) {
      console.log(data.error);
    } else {
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

      <ButtonComponent
        onClick={handleDeleteAll}
        className="m-5 p-4 rounded bg-gradient-to-tr from-purple-800 to-red-500"
      >
        Delete Completed
      </ButtonComponent>

      <TodoSortListbox
        className="m-5 p-4 rounded bg-gray-800"
        selectedSort={sortBy}
        setSelectedSort={setSortBy}
      />

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
