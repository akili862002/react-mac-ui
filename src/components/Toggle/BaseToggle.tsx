import React, { ReactNode } from "react";
import { cn } from "../../utils/classnames.utils";

export interface IBaseToggleProps {
  className?: string;
  checked: boolean;
  label?: ReactNode;
  onChange: (checked: boolean) => void;
  innerClassName?: string;
  isError?: boolean;
}

export const BaseToggle: React.FC<IBaseToggleProps> = ({
  className = "",
  checked,
  label = null,
  onChange,
  innerClassName = "",
  isError,
}) => {
  return (
    <label className={cn("flex gap-0.5 cursor-pointer", className)}>
      <div className="relative inline-flex mt-[3px]">
        <input
          checked={checked}
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={() => onChange(!checked)}
        />
        <div
          className={cn(
            "w-[28px] h-[16px] bg-gray-200 rounded-full peer",
            "peer-focus:outline-none peer-focus:ring-2 ring-offset-2 peer-focus:ring-gray-600 peer-checked:bg-gray-700",
            "peer-checked:after:translate-x-full peer-checked:after:border-white",
            "after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-[12px] after:w-[12px] after:shadow-md after:transition-all"
          )}
        />
      </div>
      <div
        className={cn(
          "font-semibold relative block w-full ",
          innerClassName,
          isError ? "text-red-600" : "text-gray-900"
        )}
      >
        {label}
      </div>
    </label>
  );
};
