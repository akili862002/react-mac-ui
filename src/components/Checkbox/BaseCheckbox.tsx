import React from "react";
import { cn } from "../../utils/classnames.utils";

export interface IBaseCheckboxProps {
  checked: boolean;
  className?: string;
  label?: string;
  isError?: boolean;
  onChange: (checked: boolean) => void;
}

export const BaseCheckbox: React.FC<IBaseCheckboxProps> = ({
  checked,
  className,
  label,
  isError,
  onChange,
}) => {
  return (
    <label className={cn("flex cursor-pointer space-x-1", className)}>
      <input
        type="checkbox"
        value=""
        checked={checked}
        className={cn(
          "flex-shrink-0 mt-[2px]",
          isError &&
            "!border-red-600 !bg-red-100 checked:!bg-red-600 checked:!border-red-600"
        )}
        style={{
          backgroundImage: checked
            ? "url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2aWV3Qm94PScwIDAgMTYgMTYnIGZpbGw9JyNmZmYnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTEyLjIwNyA0Ljc5M2ExIDEgMCAwIDEgMCAxLjQxNGwtNSA1YTEgMSAwIDAgMS0xLjQxNCAwbC0yLTJhMSAxIDAgMCAxIDEuNDE0LTEuNDE0TDYuNSA5LjA4Nmw0LjI5My00LjI5M2ExIDEgMCAwIDEgMS40MTQgMHonLz48L3N2Zz4=)"
            : undefined,
        }}
        onChange={() => onChange(!checked)}
      />
      {label && (
        <p
          className={cn(
            "font-medium select-none text-md",
            isError ? "text-red-600" : "text-gray-900"
          )}
        >
          {label}
        </p>
      )}
    </label>
  );
};
