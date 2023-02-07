import { RadioGroup } from "@headlessui/react";
import React, { ReactNode } from "react";
import { cn } from "../../utils/classnames.utils";
import { FormControl, IFormControlProps } from "../FormControl";

export interface IBaseGroupRadioProps<T> extends IFormControlProps {
  className?: string;
  horizontal?: boolean;
  optionSelected: T | null | undefined;
  options: T[];
  onChange: (option: T) => void;
  renderOption: (args: {
    option: T;
    active: boolean;
    checked: boolean;
  }) => ReactNode;
  validate?: () => string;
}

export const BaseRadioGroup = <T,>({
  className,
  horizontal = false,
  optionSelected,
  options,
  onChange,
  renderOption,
  validate,

  ...formControlProps
}: IBaseGroupRadioProps<T>) => {
  return (
    <FormControl className={className} {...formControlProps}>
      <RadioGroup
        as="div"
        onChange={onChange}
        value={optionSelected}
        className={cn(
          "flex pl-0.5  list-none",
          horizontal ? "flex-row space-x-1" : "flex-col space-y-0.5"
        )}
      >
        {options.map((option, index) => (
          <RadioGroup.Option
            className="flex items-center cursor-pointer focus:outline-none"
            as="label"
            key={index}
            value={option}
          >
            {({ active, checked }) => (
              <>
                <input className="mr-1" checked={checked} type="radio" />
                {renderOption({ option, active, checked })}
              </>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </FormControl>
  );
};
