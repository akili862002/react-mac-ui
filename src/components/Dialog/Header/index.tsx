import React from "react";
import { PropsWithChildren } from "react";
import { cn } from "../../../utils/classnames.utils";

export const _DialogHeader = ({
  className,
  title,
}: PropsWithChildren<{
  className?: string;
  title: string | undefined;
}>) => {
  return (
    <header
      className={cn(
        "relative flex flex-row items-center justify-between w-full p-1.5",
        "text-gray-900",
        className
      )}
    >
      <h1 className="text-lg font-medium">{title}</h1>
    </header>
  );
};
