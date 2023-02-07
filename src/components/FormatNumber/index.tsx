import { useField, useFormikContext } from "formik";
import React from "react";
import { BaseFormatNumber, IBaseFormatFieldProps } from "./BaseFormatNumber";

export interface IFormatNumberProps
  extends Omit<IBaseFormatFieldProps, "ref" | "onChange" | "value"> {
  name: string;
  required: boolean;
}

export const FormatNumber: React.FC<IFormatNumberProps> = (props) => {
  const [field, meta] = useField(props.name);
  const { setFieldValue } = useFormikContext();
  const isError = !!meta.touched && !!meta.error;

  return (
    <>
      <BaseFormatNumber
        value={field.value}
        validate={() => isError && meta.error}
        onChangeValue={(val) => setFieldValue(props.name, val)}
        {...props}
      />
    </>
  );
};
