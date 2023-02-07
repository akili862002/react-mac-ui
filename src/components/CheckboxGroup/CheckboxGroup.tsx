import { useField, useFormikContext } from "formik";
import React from "react";
import { HiddenInput } from "../HiddenInput";
import {
  BaseCheckboxGroup,
  IBaseCheckboxGroupProps,
} from "./BaseCheckboxGroup";

export interface ICheckboxGroupProps<T>
  extends Omit<IBaseCheckboxGroupProps<T>, "listOptionSelected" | "onChange"> {
  name: string;
  required: boolean;
}
/**
 * @usage With Formik
 */
export const CheckboxGroup = <T,>(props: ICheckboxGroupProps<T>) => {
  const { name } = props;

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField<T[]>(name);

  const isError = !!meta.touched && !!meta.error;

  return (
    <>
      <BaseCheckboxGroup
        listOptionSelected={field.value}
        onChange={(option) => setFieldValue(name, option)}
        validate={() => (isError ? meta.error : "")}
        {...props}
      />
      <HiddenInput {...(field as any)} />
    </>
  );
};
