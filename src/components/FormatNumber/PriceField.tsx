import React from "react";
import { forwardRef } from "react";
import { FormatNumber, IFormatNumberProps } from ".";
import { IIconSVGProps } from "../../types/common";
import {
  BaseFormatNumber,
  IBaseFormatFieldProps,
  IBaseFormatNumberRef,
} from "./BaseFormatNumber";

export interface IBasePriceFieldProps
  extends Omit<IBaseFormatFieldProps, "format" | "leftSide"> {}
export interface IBasePriceFieldRef extends IBaseFormatNumberRef {}

export const BasePriceField = forwardRef<
  IBasePriceFieldRef,
  IBasePriceFieldProps
>((props, ref) => {
  return (
    <BaseFormatNumber
      ref={ref}
      placeholder="0.00"
      iconLeft={<DollarIcon />}
      isAllowed={(val) => {
        if (val.value.includes(".") && val.value.split(".")[1].length > 2) {
          return false;
        }
        return true;
      }}
      {...props}
    />
  );
});

export const PriceField: React.FC<
  Omit<IFormatNumberProps, "inputProps" | "onChangeValue"> & {
    name: string;
    required: boolean;
  }
> = (props) => {
  return (
    <FormatNumber
      iconLeft={<DollarIcon />}
      placeholder="0.00"
      isAllowed={(val) => {
        if (val.value.includes(".") && val.value.split(".")[1].length > 2) {
          return false;
        }
        return true;
      }}
      {...props}
    />
  );
};

const DollarIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-600 icon-md"
  >
    <path
      d="M12 6V18M9 15.182L9.879 15.841C11.05 16.72 12.949 16.72 14.121 15.841C15.293 14.962 15.293 13.538 14.121 12.659C13.536 12.219 12.768 12 12 12C11.275 12 10.55 11.78 9.997 11.341C8.891 10.462 8.891 9.038 9.997 8.159C11.103 7.28 12.897 7.28 14.003 8.159L14.418 8.489"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
);
