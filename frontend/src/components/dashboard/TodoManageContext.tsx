import { FunctionComponent } from "react";
import useModal, { ModalAttributes } from "../../hooks/useModal";
import ButtonComponent from "../ButtonComponent";
import TodoItemModal from "./TodoItemModal";

interface TodoManageContextProps {}

const TodoManageContext: FunctionComponent<TodoManageContextProps> = ({}) => {
  const todoModal = useModal();
  
  return (
    <div>
      <ButtonComponent
        onClick={todoModal.open}
        className="p-4 rounded bg-gradient-to-tr from-green-500 to-blue-400"
      >
        Create Todo
      </ButtonComponent>
      <TodoItemModal
        modalTitle="Create TodoItem"
        buttonLabel="Create Todo"
        todoModal={todoModal}
      />
    </div>
  );
};

export default TodoManageContext;
