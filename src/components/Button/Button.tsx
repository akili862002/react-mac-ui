import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { Spinner } from "../Spinner";
import Ripple from "material-ripple-effects";
import { cn } from "../../utils/classnames.utils";

const ripple = new Ripple();

export type IButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "outline"
  | "text";

export type IButtonSize = "sm" | "md" | "lg";

export interface IButtonProps extends ButtonHTMLAttributes<any> {
  variant?: IButtonVariant;
  size?: IButtonSize;
  icon?: React.ReactNode;
  loading?: boolean;
}

const rippleLightVariants = ["primary", "danger", "outline"];

export const Button: React.FC<PropsWithChildren<IButtonProps>> = ({
  className,
  variant = "primary",
  icon,
  children,
  loading,
  type = "button",
  size = "md",
  ...rest
}) => {
  return (
    <button
      className={cn(
        "rounded-md relative flex items-center gap-1 justify-center text-md font-medium min-h-[30px] h-fit px-2",
        {
          "bg-gray-900 active:bg-black text-white": variant === "primary",
          "bg-gray-200  text-gray-700": variant === "secondary",
          "bg-red-500 active:bg-red-600 text-white": variant === "danger",
          "bg-transparent border border-gray-300 text-gray-700":
            variant === "outline",
        },
        {
          "text-sm px-1.5": size === "sm",
          "text-md px-2": size === "md",
          "text-lg px-3": size === "lg",
        },
        className
      )}
      onMouseDown={(e) =>
        ripple.create(
          e,
          rippleLightVariants.includes(variant) ? "light" : "dark"
        )
      }
      type={type}
      {...rest}
    >
      <div
        className={cn(
          loading && "text-transparent",
          icon && "items-center gap-1 flex flex-row"
        )}
      >
        {icon}
        {children}
      </div>
      {loading && (
        <div className="absolute h-fit move-center">
          <Spinner size="md" />
        </div>
      )}
    </button>
  );
};
