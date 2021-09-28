// Thanks to  https://github.com/fireship-io/framer-demo/blob/framer-motion-demo/src/hooks/useModal.jsx
import { useState } from "react";

export interface ModalAttributes { 
  isOpen: boolean;
  close: () => void;
  open: () => void;
}

// Centralizes modal control
const useModal = () : ModalAttributes => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return { isOpen, close, open };
};

export default useModal;
