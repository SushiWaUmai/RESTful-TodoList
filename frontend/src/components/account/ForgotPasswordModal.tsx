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
      modalTitle="Forgot Password?"
      handleClose={forgotPasswordModal.close}
      modalOpen={forgotPasswordModal.isOpen}
    ></ModalComponent>
  );
};

export default ForgotPassword;
