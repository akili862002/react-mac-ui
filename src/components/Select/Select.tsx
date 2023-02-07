import { useField, useFormikContext } from "formik";
import React from "react";
import { HiddenInput } from "../HiddenInput";
import { BaseSelect, IBaseSelectProps } from "./BaseSelect";

export type ISelectProps<T> = Omit<
  IBaseSelectProps<T>,
  "optionSelected" | "onSelect"
> & {
  name: string;
  required: boolean;
  onSelect?: (option: T) => void;
};

export const Select = <T,>(props: ISelectProps<T>) => {
  const { onSelect, ...rest } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField<T>(props.name);

  const isError = !!meta.touched && !!meta.error;

  return (
    <>
      <BaseSelect
        validate={() => (isError ? meta.error : "")}
        optionSelected={field.value}
        onSelect={(option) => {
          setFieldValue(props.name, option);
          onSelect?.(option);
        }}
        {...(rest as IBaseSelectProps<T>)}
      />
      <HiddenInput {...field} />
    </>
  );
};
