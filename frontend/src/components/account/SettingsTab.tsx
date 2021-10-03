import { FunctionComponent } from "react";
import useModal from "../../hooks/useModal";
import ButtonComponent from "../ButtonComponent";
import DeleteModal from "./DeleteModal";
import ForgotPassword from "./ForgotPasswordModal";

interface SettingsTabProps {}

const SettingsTab: FunctionComponent<SettingsTabProps> = () => {
  const deleteModal = useModal();
  const forgotPasswordModal = useModal();

  return (
    <>
      <h1 className="text-4xl lg:text-5xl">Settings</h1>
      <br />
      <ButtonComponent
        onClick={forgotPasswordModal.open}
        className="my-5 p-3 block bg-gradient-to-br from-yellow-400 to-red-500 rounded"
      >
        Forgot Password
      </ButtonComponent>
      <ButtonComponent
        onClick={deleteModal.open}
        className="my-5 p-3 block bg-red-500 rounded"
      >
        Delete Account
      </ButtonComponent>
      <DeleteModal deleteModal={deleteModal} />
      <ForgotPassword forgotPasswordModal={forgotPasswordModal} />
    </>
  );
};

export default SettingsTab;
