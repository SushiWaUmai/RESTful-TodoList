import { FunctionComponent } from "react";
import { ModalAttributes } from "../../hooks/useModal";
import ModalComponent from "../ModalComponent";

interface ForgotPasswordProps {
  forgotPasswordModal: ModalAttributes;
}

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = ({
  forgotPasswordModal,
}) => {
  return (
    <ModalComponent
      handleClose={forgotPasswordModal.close}
      modalOpen={forgotPasswordModal.isOpen}
    >
      <h1 className="text-3xl m-2 p-3">Forgot Password?</h1>
      <hr />
    </ModalComponent>
  );
};

export default ForgotPassword;
