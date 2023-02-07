import { PropsWithChildren } from "react";
import { FieldMetaProps, useField } from "formik";
import { cn } from "../../utils/classnames.utils";
import React from "react";

export interface IFormControlProps {
  name?: string;
  label?: string | null;
  className?: string;
  labelClassName?: string;
  required?: boolean | undefined;
  disabled?: boolean;
}

export const FormControl = ({
  name = "",
  label,
  labelClassName = "",
  className = "",
  required,
  disabled = false,
  children,
}: PropsWithChildren<IFormControlProps>) => {
  let meta: Partial<FieldMetaProps<any>> = { touched: false, error: undefined };
  let _;

  if (name) {
    [_, meta] = useField(name);
  }

  const isError: boolean = !!meta.touched && !!meta.error;

  return (
    <div
      className={cn(
        "font-medium relative block w-full",
        isError ? "text-red-500" : "text-gray-900",
        disabled && "pointer-events-none opacity-50 select-none",
        className
      )}
      data-required={required}
      data-label={label}
      data-name={name}
      data-disable={disabled}
    >
      {label && (
        <label
          className={"text-sm block font-medium mb-[2px]" + labelClassName}
        >
          {label}
        </label>
      )}
      {children}
      {isError && typeof meta.error === "string" && (
        <FormControl.Error errorMessage={meta.error} />
      )}
    </div>
  );
};

FormControl.Error = ({ errorMessage }: { errorMessage: string }) =>
  errorMessage ? <p className="text-xs pl-0.5">{errorMessage}</p> : null;

export const getBaseFieldClassName = (args: {
  isError?: boolean;
  active?: boolean;
}) => {
  return cn(
    "w-full px-1 border rounded-lg h-3 placeholder:font-medium truncate",
    args.isError ? " bg-red-50" : " bg-gray-50",
    args.isError
      ? "placeholder-red-500 [&>.placeholder]:text-red-500"
      : " placeholder:text-gray-400  [&>.placeholder]:text-gray-500",
    " focus:ring-blue-700 focus:outline-none focus:border-blue-700 focus:ring-1",
    args.active && "ring-blue-500 ring-1 border-blue-500",
    !!args.isError && "border-red-500"
  );
};

export const listboxStyle = {
  button: (open: boolean, isError: boolean | undefined) =>
    cn(
      getBaseFieldClassName({ isError, active: open }),
      "group flex items-center cursor-pointer select-none relative focus:outline-none text-left "
    ),
  optionsContainerTransitions: () => ({
    enter: "transition ease-out duration-100",
    enterFrom: "transform opacity-0-translate-y-3",
    enterTo: "transform opacity-100 translate-y-0",
    leave: "transition ease-in duration-75 ",
    leaveFrom: "transform opacity-100",
    leaveTo: "transform opacity-0",
  }),
  optionContainer: (additionalClassName = "") =>
    cn(
      " bg-white text-sm p-0.5 max-h-50 overflow-y-auto text-gray-800 z-40 shadow-md border absolute mt-0.5 w-full rounded-lg outline-none",
      additionalClassName
    ),

  option: (active: boolean, selected: boolean) =>
    cn(
      "px-1 w-full py-[3px] cursor-pointer rounded-lg relative text-left",
      active && "bg-gray-100 active:bg-gray-200",
      selected && "bg-gray-800 text-white active:bg-blue-700"
    ),
};
