import { GenericResponse } from "@shared/SharedTypes";
import {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { TodoItem } from "@shared/entities/TodoItem";
import { motion, Variants } from "framer-motion";
import TodoItemDisplay from "./TodoItemDisplay";
import useModal from "../../hooks/useModal";
import TodoItemModal from "./TodoItemModal";
import { SortType } from "../../pages/account/dashboard";
import { BACKEND_URI } from "../../utils/Constants";

const listVariant: Variants = {
  opened: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariant: Variants = {
  opened: {
    scale: 1,
  },
  closed: {
    scale: 0,
  },
};

type TodoListDisplayProps = HTMLAttributes<HTMLDivElement> & {
  showCompleted: boolean;
  sortBy: SortType;
  todos: TodoItem[];
  getTodos: () => Promise<void>;
};

const TodoListDisplay: FunctionComponent<TodoListDisplayProps> = (props) => {
  const [selected, setSelected] = useState<TodoItem>();
  const todoModal = useModal();

  const { showCompleted, sortBy, todos, getTodos, ...divProps } = props;

  const handleEdit = useCallback(
    async (val: TodoItem) => {
      let data: GenericResponse = await (
        await axios.put(`${BACKEND_URI}/todos/`, val, {
          withCredentials: true,
        })
      )?.data;
      if (!data?.error) {
        await getTodos();
      }
    },
    [getTodos]
  );

  const openEditModal = useCallback(
    (todoItem: TodoItem) => {
      setSelected(todoItem);
      todoModal.open();
    },
    [todoModal]
  );

  const handleToogleCheck = useCallback(
    (todoItem: TodoItem) => {
      todoItem.done = !todoItem.done;
      handleEdit(todoItem);
    },
    [handleEdit]
  );

  const todoMap = useMemo(() => {
    if (todos.length > 0) {
      var todoToMap = todos;

      if (sortBy === "Date")
        todoToMap = todos.sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );
      else if (sortBy === "Title")
        todoToMap = todos.sort((a, b) => (a.title < b.title ? -1 : 1));

      return todoToMap
        .map<ReactNode>((todo, i) => {
          if (showCompleted || !todo.done) {
            return (
              <TodoItemDisplay
                key={i}
                todoItem={todo}
                handleEdit={() => openEditModal(todo)}
                toogleCheck={() => handleToogleCheck(todo)}
                variants={itemVariant}
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
  }, [handleToogleCheck, openEditModal, showCompleted, todos, sortBy]);

  return (
    <div {...divProps}>
      <motion.ul
        variants={listVariant}
        initial="closed"
        animate="opened"
        exit="closed"
      >
        {todoMap}
      </motion.ul>
      <TodoItemModal
        modalTitle="Edit TodoItem"
        buttonLabel="Edit Todo"
        initialValues={selected}
        todoModal={todoModal}
        onSubmit={handleEdit}
      />
    </div>
  );
};

export default TodoListDisplay;
