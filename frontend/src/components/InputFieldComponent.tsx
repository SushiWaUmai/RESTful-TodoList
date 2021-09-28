import { ErrorMessage, Field } from "formik";
import React, { FunctionComponent, InputHTMLAttributes } from "react";

type InputFieldComponentProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};
const InputFieldComponent: FunctionComponent<InputFieldComponentProps> = ({
  placeholder,
  label,
  name,
  type,
  className,
}) => {
  return (
    <div className={(className ? className + " " : "") + "my-5"}>
      <label className="my-3" htmlFor={name}>
        {label}
      </label>
      <br />
      <Field
        className="py-1 px-2 my-1 mr-5 bg-white dark:bg-black"
        placeholder={placeholder}
        type={type}
        name={name}
      />
      <ErrorMessage name={name}>
        {(msg) => <span className="text-red-500">{msg}</span>}
      </ErrorMessage>
    </div>
  );
};

export default InputFieldComponent;
