import { useField } from "formik";
import React from "react";
import { IBaseAreaFieldProps, BaseTextArea } from "./BaseTextArea";

export type ITextAreaProps = Omit<IBaseAreaFieldProps, "onChange"> & {
  name: string;
  required: boolean;
};

export const TextArea: React.FC<ITextAreaProps> = (props) => {
  const [field, meta] = useField<string>(props.name);
  const isError = !!meta.touched && !!meta.error;

  return (
    <BaseTextArea
      validate={() => (isError ? meta.error : "")}
      inputProps={field}
      {...props}
    />
  );
};
