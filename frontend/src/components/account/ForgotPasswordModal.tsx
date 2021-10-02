import axios from "axios";
import { Form, Formik } from "formik";
import { FunctionComponent } from "react";
import { ModalAttributes } from "../../hooks/useModal";
import ButtonComponent from "../ButtonComponent";
import InputFieldComponent from "../InputFieldComponent";
import ModalComponent from "../ModalComponent";

interface ForgotPasswordProps {
  forgotPasswordModal: ModalAttributes;
}

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = ({
  forgotPasswordModal,
}) => {
  const handleForgotPassword = async (val: { usernameOrEmail: string }) => {
    const data = await (
      await axios.post(
        "http://localhost:4000/user/forgotPassword",
        { usernameOrEmail: val.usernameOrEmail },
        { withCredentials: true }
      )
    )?.data;

    if (data?.error) {
      console.log("Failed to send forgot password email");
    }
  };

  return (
    <ModalComponent
      modalTitle="Forgot Password?"
      handleClose={forgotPasswordModal.close}
      modalOpen={forgotPasswordModal.isOpen}
    >
      <Formik
        onSubmit={handleForgotPassword}
        initialValues={{ usernameOrEmail: "" }}
      >
        <Form>
          <InputFieldComponent
            fieldProps={{
              className: "inputfield w-full",
              name: "usernameOrEmail",
              placeholder: "Username Or Email",
              type: "text",
            }}
            divProps={{ className: "my-5" }}
            label="Username Or Email"
          />
          <div className="flex justify-end">
            <ButtonComponent
              className="my-5 p-3 block bg-red-500 rounded"
              type="submit"
            >
              Send Mail
            </ButtonComponent>
          </div>
        </Form>
      </Formik>
    </ModalComponent>
  );
};

export default ForgotPassword;
