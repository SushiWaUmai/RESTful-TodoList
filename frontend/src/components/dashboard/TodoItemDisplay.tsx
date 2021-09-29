import { TodoItem } from "@shared/entities/TodoItem";
import { HTMLMotionProps, motion } from "framer-motion";
import { FunctionComponent } from "react";
import { BsCheck, BsCircle } from "react-icons/bs";

type TodoItemDisplayProps = HTMLMotionProps<"li"> & {
  todoItem: TodoItem;
  onDoubleClick: () => void;
};

const TodoItemDisplay: FunctionComponent<TodoItemDisplayProps> = (props) => {
  const { todoItem, onDoubleClick } = props;

  return (
    <motion.li {...props}>
      <div
        className="p-3 mb-3 bg-gray-900 hover:bg-gray-800 rounded-lg"
        onDoubleClick={onDoubleClick}
      >
        <div className="flex justify-between">
          <div className="flex justify-center align-middle">
            <h1 className="text-3xl select-none">
              <b>{todoItem.title}</b>
            </h1>
          </div>
          <div className="flex align-middle h-full">
            <div className="relative">
              <BsCircle size={48} />
              <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
                <BsCheck className="opacity-0 hover:opacity-100" size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default TodoItemDisplay;
