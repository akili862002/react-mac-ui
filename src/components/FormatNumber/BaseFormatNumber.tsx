import { isFunction } from "formik";
import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useImperativeHandle,
  useRef,
} from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import { cn } from "../../utils/classnames.utils";
import { pick } from "../../utils/mappedObject.utils";
import {
  FormControl,
  getBaseFieldClassName,
  IFormControlProps,
} from "../FormControl";

export type IBaseFormatFieldProps = IFormControlProps &
  Omit<NumberFormatProps, "defaultValue"> & {
    value?: number;
    inputClassName?: string;
    inputProps?: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >;
    iconLeft?: ReactNode;
    leftSide?: ReactNode | ((isError: boolean) => ReactNode);
    onChangeValue?: (value: number) => void;
    validate?: (value: number) => string | undefined;
  };

export interface IBaseFormatNumberRef {
  getValue: () => number;
  setValue: (value: number) => void;
  focus: () => void;
  blur: () => void;
}

export const BaseFormatNumber = forwardRef<
  IBaseFormatNumberRef,
  IBaseFormatFieldProps
>(
  (
    {
      className,
      inputClassName,
      inputProps = {},
      leftSide,
      iconLeft = null,
      value,
      validate,
      onChangeValue,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>();

    const error = validate?.(value);

    useImperativeHandle(
      ref,
      () => ({
        getValue: () => Number(inputRef.current.value),
        setValue: (val) => {
          inputRef.current.value = String(val);
          onChangeValue?.(val);
        },
        focus: () => inputRef.current.focus(),
        blur: () => inputRef.current.blur(),
      }),
      [inputRef]
    );

    return (
      <FormControl
        className={cn("w-full", className)}
        {...pick(rest, ["name", "label", "required", "disabled"])}
      >
        <div className="relative flex w-full">
          {leftSide && (
            <div className="flex-shrink-0 h-full bg-gray-200 border-r-0 rounded-l-lg rounded-r-none">
              {isFunction(leftSide) ? leftSide(!!error) : leftSide}
            </div>
          )}
          {iconLeft && (
            <div className="left-1 max-w-2.5 absolute center-children move-center-y">
              {iconLeft}
            </div>
          )}
          <NumberFormat
            getInputRef={inputRef}
            value={value}
            className={cn(
              getBaseFieldClassName({ isError: !!error }),
              leftSide && "rounded-l-none",
              iconLeft && "pl-4",
              inputClassName
            )}
            {...rest}
            {...(inputProps as any)}
            onValueChange={(val) => {
              onChangeValue?.(val.floatValue);
            }}
          />
        </div>
      </FormControl>
    );
  }
);
