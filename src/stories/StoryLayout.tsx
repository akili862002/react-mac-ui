import React from "react";
import { PropsWithChildren } from "react";
import { cnx } from "../utils/classnames.utils";

export const SectionSb: React.FC<
  PropsWithChildren<{ title?: string; className?: string }>
> = ({ title, className, children }) => {
  return (
    <div
      className={cnx(
        "w-full p-2 m-auto bg-white rounded-lg shadow-md max-w-tablet",
        className
      )}
    >
      {title && <h5 className="mb-2 text-xl font-semibold">{title}</h5>}
      <div className="mt-2 space-y-2">{children}</div>
    </div>
  );
};
