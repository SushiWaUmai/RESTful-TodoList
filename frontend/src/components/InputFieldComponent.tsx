import { ErrorMessage, Field, FieldAttributes } from "formik";
import React, {
  FunctionComponent,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";

type FieldInputProps = FieldAttributes<InputHTMLAttributes<HTMLInputElement>> & {
  name: string;
}

interface InputFieldComponentProps {
  fieldProps: FieldInputProps; 
  divProps?: HTMLAttributes<HTMLDivElement>;
  label: string;
}
const InputFieldComponent: FunctionComponent<InputFieldComponentProps> = ({
  fieldProps,
  divProps,
  label,
}) => {
  return (
    <div { ...divProps }>
      <label className="my-3" htmlFor={fieldProps.name}>
        {label}
      </label>
      <br />
      <Field
        {...fieldProps}
      />
      <ErrorMessage name={fieldProps.name}>
        {(msg) => <span className="text-red-500">{msg}</span>}
      </ErrorMessage>
    </div>
  );
};

export default InputFieldComponent;
