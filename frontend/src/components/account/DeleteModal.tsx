import { FunctionComponent } from "react";
import useModal, { ModalAttributes } from "../../hooks/useModal";
import ModalComponent from "../ModalComponent";

interface DeleteModalProps {
  deleteModal: ModalAttributes;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({ deleteModal }) => {
  return (
    <ModalComponent
      handleClose={deleteModal.close}
      modalOpen={deleteModal.isOpen}
    >
      <h1 className="text-3xl m-2 p-3">Delete Account?</h1>
      <hr />
    </ModalComponent>
  );
};

export default DeleteModal;
