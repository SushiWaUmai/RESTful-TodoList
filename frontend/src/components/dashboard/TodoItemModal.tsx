import { TodoItem } from "@shared/entities/TodoItem";
import { TodoItemResponse } from "@shared/SharedTypes";
import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/dist/client/router";
import { FunctionComponent } from "react";
import { ModalAttributes } from "../../hooks/useModal";
import { toErrorMap } from "../../utils/ToErrorMap";
import ButtonComponent from "../ButtonComponent";
import InputFieldComponent from "../InputFieldComponent";
import ModalComponent from "../ModalComponent";
import { BsX } from "react-icons/bs";

interface TodoItemModalProps {
  modalTitle: string;
  todoModal: ModalAttributes;
}

const TodoItemModal: FunctionComponent<TodoItemModalProps> = ({
  todoModal,
  modalTitle,
}) => {
  const router = useRouter();

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
      router.push("/dashboard");
    }
  };

  const initialValues: TodoItem = {
    title: "",
    description: "",
  };

  return (
    <ModalComponent handleClose={todoModal.close} modalOpen={todoModal.isOpen}>
      <div className="m-3 flex flex-col justify-center">
        <div className="flex justify-between">
          <h1 className="text-3xl m-2 p-3">{modalTitle}</h1>
          <ButtonComponent onClick={todoModal.close}>
            <BsX size={48} />
          </ButtonComponent>
        </div>
        <hr />
        <div className="flex justify-center">
          <div className="m-5">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <>
                  <Form>
                    <InputFieldComponent
                      type="text"
                      label="Title"
                      name="title"
                      placeholder="Title"
                    />
                    <InputFieldComponent
                      type="text"
                      label="Description"
                      name="description"
                      placeholder="Description"
                    />
                    <div className="flex justify-between">
                      <ButtonComponent
                        className="p-3 my-3 rounded bg-gradient-to-tr from-green-500 to-blue-400"
                        type="submit"
                        onClick={todoModal.close}
                        disabled={isSubmitting}
                      >
                        Create Todo
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
