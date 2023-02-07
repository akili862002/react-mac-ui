import { ForwardedRef } from "react";
import {
  FormControl,
  getBaseFieldClassName,
  IFormControlProps,
} from "../FormControl";
import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  memo,
  ReactNode,
  useImperativeHandle,
  useRef,
} from "react";
import { isFunction } from "formik";
import React from "react";
import { cnx } from "../../utils/classnames.utils";

type IInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type IBaseTextFieldChildrenArgs = {
  isError?: boolean;
};

export type IBaseTextFieldProps = IFormControlProps & {
  value?: string;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  type?: "text" | "number" | "password";
  inputProps?: Omit<
    IInputProps,
    "type" | "defaultValue" | "placeholder" | "className" | "ref"
  >;
  leftSide?: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  /**
   * Use
   */
  children?: ReactNode | ((args: IBaseTextFieldChildrenArgs) => ReactNode);
  /**
   * use onChangeValue instead of onChange, since Formik will overwrite the onChange
   */
  onChangeValue?: (value: string | number) => void;
  validate?: (value: string | undefined) => string | undefined | null;
} & {
  ref?: ForwardedRef<IBaseTextFieldRef>;
};

export interface IBaseTextFieldRef {
  getValue: () => string;
  setValue: (val: string) => void;
  focus: () => void;
  blur: () => void;
}

const BaseTextFieldComponent = forwardRef<
  IBaseTextFieldRef,
  IBaseTextFieldProps
>(
  (
    {
      className = "",
      value,
      inputClassName = "",
      children = null,
      leftSide = null,
      iconLeft = null,
      iconRight = null,
      placeholder,
      type = "text",

      inputProps = {},

      onChangeValue,
      validate,
      ...formControlProps
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>();
    const error = validate?.(inputRef.current?.value);

    useImperativeHandle(
      ref,
      () => ({
        getValue: () => inputRef.current.value,
        setValue: (val) => {
          inputRef.current.value = val;
          onChangeValue?.(val);
        },
        focus: () => inputRef.current.focus(),
        blur: () => inputRef.current.blur(),
      }),
      [inputRef]
    );

    return (
      <FormControl className={className} {...formControlProps}>
        <div className="relative flex w-full">
          {leftSide && (
            <div className="flex-shrink-0 h-full bg-gray-200 border-r-0 rounded-r-none">
              {leftSide}
            </div>
          )}
          {iconLeft && (
            <div className="left-1 max-w-2.5 absolute center-children move-center-y">
              {iconLeft}
            </div>
          )}
          {iconRight && (
            <div className="right-1 center-children max-w-2.5 absolute move-center-y">
              {iconRight}
            </div>
          )}
          <input
            value={value}
            ref={inputRef}
            type={type}
            placeholder={placeholder}
            className={cnx(
              getBaseFieldClassName({ isError: !!error }),
              iconLeft && "pl-4",
              leftSide && "rounded-l-none",
              inputClassName
            )}
            {...inputProps}
            onChange={(e) => {
              onChangeValue?.(e.target.value);
              inputProps?.onChange?.(e);
            }}
          />
          {isFunction(children) ? children({ isError: !!error }) : children}
        </div>
      </FormControl>
    );
  }
);
export const BaseTextField = memo(BaseTextFieldComponent);
