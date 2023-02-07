import { useField, useFormikContext } from "formik";
import React from "react";
import { HiddenInput } from "../HiddenInput";
import { IBaseGroupRadioProps, BaseRadioGroup } from "./BaseGroupRadio";

export interface IRadioGroupProps<T>
  extends Omit<IBaseGroupRadioProps<T>, "optionSelected" | "onChange"> {
  name: string;
  required: boolean;
}
/**
 * @usage With Formik
 */
export const RadioGroup = <T,>(props: IRadioGroupProps<T>) => {
  const { name } = props;

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField<T>(name);

  const isError = !!meta.touched && !!meta.error;

  return (
    <>
      <BaseRadioGroup
        optionSelected={field.value}
        onChange={(option) => setFieldValue(name, option)}
        validate={() => (isError ? meta.error : "")}
        {...props}
      />
      <HiddenInput {...(field as any)} />
    </>
  );
};
