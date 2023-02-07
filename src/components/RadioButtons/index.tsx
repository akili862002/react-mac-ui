import React from "react";
import { RadioGroup } from "@headlessui/react";
import { cn } from "../../utils/classnames.utils";

type IRadioButtonsProps<T> = {
  className?: string;
  label?: string;
  optionSelected: T | null;
  options: T[];
  renderOption: (option: T, checked: boolean) => React.ReactNode;
  onChange: (option: T) => void;
};

const RadioButtons = <T,>({
  optionSelected,
  label,
  className,
  options,
  renderOption,
  onChange,
}: IRadioButtonsProps<T>) => {
  return (
    <RadioGroup
      className={className}
      value={optionSelected}
      onChange={onChange}
    >
      <div className="flex w-full font-semibold">
        {options.map((option, index) => (
          <RadioGroup.Option
            as="button"
            type="button"
            key={index}
            value={option}
            className={({ active, checked }) =>
              cn(
                "center-children p-[5px] w-full first:rounded-l-md last:rounded-r-md border-t border-r border-b first:border-l text-sm",
                !checked && "bg-gray-100 border-gray-300 text-gray-600",
                checked && "bg-gray-200 border border-gray-600 text-gray-600"
              )
            }
          >
            {({ active, checked }) => renderOption(option, checked) as any}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default RadioButtons;
