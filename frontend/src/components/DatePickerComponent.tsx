import { ErrorMessage, useField, FieldAttributes } from "formik";
import React, {
  FunctionComponent,
  HTMLAttributes,
} from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type DateInputProps = Optional<ReactDatePickerProps, "onChange"> &
  HTMLAttributes<HTMLInputElement> & {
    name: string;
  };

interface DatePickerComponentProps {
  fieldProps: DateInputProps;
  divProps?: HTMLAttributes<HTMLDivElement>;
  label: string;
}

const DatePickerComponent: FunctionComponent<DatePickerComponentProps> = ({
  fieldProps,
  divProps,
  label,
}) => {
  const [field, , { setValue }] = useField(fieldProps);

  return (
    <div {...divProps}>
      <label className="my-3" htmlFor={fieldProps.name}>
        {label}
      </label>
      <br />
      <ReactDatePicker
        {...fieldProps}
        {...field}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => setValue(val)}
      />
      <ErrorMessage name={fieldProps.name}>
        {(msg) => <span className="text-red-500">{msg}</span>}
      </ErrorMessage>
    </div>
  );
};

export default DatePickerComponent;
