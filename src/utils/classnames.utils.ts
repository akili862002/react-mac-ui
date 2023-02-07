import classnames from "classnames";
import { twMerge } from "tailwind-merge";

export const cn = classnames;

export const cnx = (...args: any[]) => {
  return cn(twMerge(args));
};
