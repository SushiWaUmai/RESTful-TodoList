import { TodoItem } from "@shared/entities/TodoItem";
import { Form, Formik, FormikHelpers } from "formik";
import { FunctionComponent } from "react";
import { ModalAttributes } from "../../hooks/useModal";
import ButtonComponent from "../ButtonComponent";
import InputFieldComponent from "../InputFieldComponent";
import ModalComponent from "../ModalComponent";
import { BsX } from "react-icons/bs";

interface TodoItemModalProps {
  modalTitle: string;
  buttonLabel: string;
  todoModal: ModalAttributes;
  initialValues?: TodoItem;
  onSubmit: (
    values: TodoItem,
    { setErrors, setSubmitting }: FormikHelpers<TodoItem>
  ) => any;
}

const TodoItemModal: FunctionComponent<TodoItemModalProps> = ({
  todoModal,
  modalTitle,
  onSubmit,
  buttonLabel,
  initialValues,
}) => {
  if (!initialValues) {
    initialValues = {
      title: "",
      description: "",
      done: false,
    };
  }
  return (
    <ModalComponent handleClose={todoModal.close} modalOpen={todoModal.isOpen}>
      <div className="flex flex-col justify-center">
        <div className="flex justify-between">
          <h1 className="lg:mr-64 text-3xl p-3">{modalTitle}</h1>
          <ButtonComponent onClick={todoModal.close}>
            <BsX size={48} />
          </ButtonComponent>
        </div>
        <hr />
        <div className="flex justify-start">
          <div className="w-full h-full m-5">
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ isSubmitting }) => (
                <>
                  <Form>
                    <InputFieldComponent
                      fieldProps={{
                        type: "text",
                        name: "title",
                        placeholder: "Title",
                        className: "inputfield w-full",
                      }}
                      divProps={{ className: "my-5" }}
                      label="Title"
                    />
                    <InputFieldComponent
                      fieldProps={{
                        type: "text",
                        name: "description",
                        placeholder: "Description",
                        className: "inputfield w-full resize-none",
                        as: "textarea",
                        rows: 5,
                      }}
                      divProps={{ className: "my-5" }}
                      label="Description"
                    />
                    <div className="flex justify-end">
                      <ButtonComponent
                        className="p-3 my-3 rounded bg-gradient-to-tr from-green-500 to-blue-400"
                        type="submit"
                        onClick={todoModal.close}
                        disabled={isSubmitting}
                      >
                        {buttonLabel}
                      </ButtonComponent>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </ModalComponent>
  );
};

export default TodoItemModal;
