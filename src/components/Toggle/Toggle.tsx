import { useField, useFormikContext } from "formik";
import React from "react";
import { PropsWithChildren } from "react";
import { BaseToggle, IBaseToggleProps } from "./BaseToggle";

export interface IToggleProps
  extends Omit<IBaseToggleProps, "checked" | "onChange"> {
  useReverseBoolean?: boolean;
  name: string;
  required: boolean;
}

export const Toggle: React.FC<PropsWithChildren<IToggleProps>> = (props) => {
  const [field, meta] = useField(props.name);
  const { setFieldValue } = useFormikContext();
  const isError = !!meta?.error && !!meta.touched;

  return (
    <BaseToggle
      checked={props?.useReverseBoolean ? !field.value : field.value}
      onChange={(checked) =>
        setFieldValue(props.name, props?.useReverseBoolean ? !checked : checked)
      }
      isError={isError}
      {...props}
    />
  );
};
