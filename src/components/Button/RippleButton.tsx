import React, { ButtonHTMLAttributes } from "react";
import Ripple from "material-ripple-effects";

const ripple = new Ripple();

export interface IRippleButtonProps extends ButtonHTMLAttributes<any> {
  theme?: "light" | "dark";
}

export const RippleButton: React.FC<IRippleButtonProps> = ({
  theme = "dark",
  ...rest
}) => {
  return <button onMouseDown={(e) => ripple.create(e, theme)} {...rest} />;
};
