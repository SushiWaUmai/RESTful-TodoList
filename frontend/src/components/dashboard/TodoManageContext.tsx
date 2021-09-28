import { FunctionComponent } from "react";
import { ModalAttributes } from "../../hooks/useModal";
import ButtonComponent from "../ButtonComponent";
import TodoItemModal from "./TodoItemModal";

interface TodoManageContextProps {
  todoModal: ModalAttributes;
}

const TodoManageContext: FunctionComponent<TodoManageContextProps> = ({
  todoModal,
}) => {
  return (
    <div>
      <ButtonComponent
        onClick={todoModal.open}
        className="p-4 rounded bg-gradient-to-tr from-green-500 to-blue-400"
      >
        Create Todo
      </ButtonComponent>
      <TodoItemModal modalTitle="Create TodoItem" todoModal={todoModal} />
    </div>
  );
};

export default TodoManageContext;
