import { TodoItem } from "@shared/entities/TodoItem";
import { HTMLMotionProps, motion } from "framer-motion";
import { FunctionComponent } from "react";

type TodoItemDisplayProps = HTMLMotionProps<"li"> & {
  todoItem: TodoItem;
};

const TodoItemDisplay: FunctionComponent<TodoItemDisplayProps> = (props) => {
  const { todoItem } = props;
  return (
    <motion.li
      {...props}
      className="p-3 mb-3 bg-gradient-to-b from-black to-gray-800 rounded-lg"
    >
      <div>
        <p>
          <b>{todoItem.title}</b>
        </p>
        <br />
        <p>{todoItem.description}</p>
      </div>
    </motion.li>
  );
};

export default TodoItemDisplay;
