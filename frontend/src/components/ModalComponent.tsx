import { AnimatePresence, motion } from "framer-motion";
import { FunctionComponent } from "react";
import { BsX } from "react-icons/bs";
import ButtonComponent from "./ButtonComponent";

const newspaper = {
  hidden: {
    transform: "scale(0) rotate(720deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotate(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotate(-720deg)",
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

interface ModalComponentProps {
  modalOpen: boolean;
  modalTitle: string;
  handleClose: () => void;
}

const ModalComponent: FunctionComponent<ModalComponentProps> = ({
  modalOpen,
  modalTitle,
  handleClose,
  children,
}) => {
  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {modalOpen && (
        <>
          <motion.div
            className="bg-black absolute w-full h-full top-0 left-0"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          ></motion.div>
          <div className="absolute w-full h-full top-0 left-0 flex align-middle justify-center">
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="m-auto p-5 z-10 bg-gradient-to-br from-pink-800 to-red-400 rounded"
              variants={newspaper}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col justify-center">
                <div className="flex justify-between">
                  <h1 className="md:mr-32 lg:mr-64 text-3xl p-3">{modalTitle}</h1>
                  <ButtonComponent onClick={handleClose}>
                    <BsX size={48} />
                  </ButtonComponent>
                </div>
                <hr />
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalComponent;
