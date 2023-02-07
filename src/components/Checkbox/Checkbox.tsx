import { useField, useFormikContext } from "formik";
import React from "react";
import { BaseCheckbox, IBaseCheckboxProps } from "./BaseCheckbox";

export interface ICheckboxProps
  extends Omit<IBaseCheckboxProps, "checked" | "validate" | "onChange"> {
  name: string;
  label?: string;
  required?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<ICheckboxProps> = ({
  name,
  onChange,
  ...rest
}) => {
  const [fields, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const isError = !!meta?.error && !!meta.touched;

  return (
    <BaseCheckbox
      checked={fields.value || false}
      onChange={(checked) => {
        setFieldValue(name, checked);
        onChange?.(checked);
      }}
      isError={isError}
      {...rest}
    />
  );
};
