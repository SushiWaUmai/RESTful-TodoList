import { FunctionComponent } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

type ButtonComponentProps = HTMLMotionProps<"button">;

const ButtonComponent: FunctionComponent<ButtonComponentProps> = (
  props: ButtonComponentProps
) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {props.children}
    </motion.button>
  );
};

export default ButtonComponent;
