import React from "react";
import { ChangeEvent, forwardRef } from "react";
import { cn } from "../../utils/classnames.utils";
import {
  FormControl,
  getBaseFieldClassName,
  IFormControlProps,
} from "../FormControl";

export type IBaseAreaFieldProps = IFormControlProps & {
  value?: string;
  className?: string;
  /**
   * @desc Use this to change min-height of textarea
   * @example inputClassName="min-h-[300px]"
   */
  inputClassName?: string;
  placeholder?: string;
  inputProps?: object;
  /**
   * use onChangeValue instead of onChange, since Formik will overwrite the onChange
   */
  onChangeValue?: (value: string | number) => void;
  validate?: (value: string | undefined) => string | undefined | null;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const BaseTextArea = forwardRef<
  HTMLTextAreaElement,
  IBaseAreaFieldProps
>(
  (
    {
      value,
      className = "",
      inputClassName = "",
      inputProps = {},
      placeholder,

      onChangeValue,
      validate,
      onChange,
      ...formControlProps
    },
    ref
  ) => {
    const error = validate?.(value as string);

    return (
      <FormControl className={cn("relative", className)} {...formControlProps}>
        <textarea
          ref={ref}
          value={value}
          className={cn(
            getBaseFieldClassName({ isError: !!error }),
            "min-h-[100px] !overflow-visible p-1 !whitespace-pre-wrap",
            inputClassName
          )}
          placeholder={placeholder}
          onChange={(e) => {
            onChangeValue(e.target.value);
            onChange(e);
          }}
          {...inputProps}
        />
      </FormControl>
    );
  }
);
