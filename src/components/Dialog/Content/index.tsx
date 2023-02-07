import React from "react";
import { PropsWithChildren } from "react";
import { cn } from "../../../utils/classnames.utils";

export const _DialogContent = ({
  children,
  className = "",
  noButtons = false,
}: PropsWithChildren<{
  className?: string;
  noButtons?: boolean;
}>) => {
  return (
    <main
      className={cn(
        "w-full text-md font-normal px-1.5",
        noButtons && "pb-1.5",
        className
      )}
    >
      {children}
    </main>
  );
};
