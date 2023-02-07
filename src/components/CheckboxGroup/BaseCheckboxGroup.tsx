import { FormControl, IFormControlProps } from "../FormControl";
import { ReactNode } from "react";
import { BaseCheckbox } from "../Checkbox/BaseCheckbox";
import { noopEqual } from "../../utils/mics.utils";
import { has } from "../../utils/utils";
import React from "react";

export interface IBaseCheckboxGroupProps<T> extends IFormControlProps {
  loading?: boolean;
  className?: string;
  listOptionSelected: T[] | null | undefined;
  options: T[];
  onChange: (option: T[]) => void;
  renderOption: (args: { option: T; checked: boolean }) => ReactNode;
  validate?: () => string;
  isEqual?: (a: T, b: T) => boolean;
}

export const BaseCheckboxGroup = <T,>({
  className,
  listOptionSelected,
  options,
  onChange,
  renderOption,
  isEqual = noopEqual,
  validate,
  loading,
  ...formControlProps
}: IBaseCheckboxGroupProps<T>) => {
  const handleChangeOption = (option: T, checked: boolean) => {
    if (checked) {
      onChange([...listOptionSelected, option]);
    } else {
      onChange(listOptionSelected.filter((item) => !isEqual(item, option)));
    }
  };

  return (
    <FormControl className={className} {...formControlProps}>
      <div className="flex flex-col pl-0.5 space-y-1">
        {!loading ? (
          options.map((option, index) => {
            const checked = has(listOptionSelected, option, isEqual);
            return (
              <label
                className="flex gap-1 cursor-pointer focus:outline-none"
                key={index}
              >
                <BaseCheckbox
                  checked={checked}
                  onChange={(checked) => handleChangeOption(option, checked)}
                />
                {renderOption({ option, checked: false })}
              </label>
            );
          })
        ) : (
          <div className="space-y-1">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        )}
      </div>
    </FormControl>
  );
};

const Skeleton: React.FC = (props) => {
  return (
    <div className="flex h-2.5">
      <div className="w-3 mr-1 bg-gray-100 rounded-lg"></div>
      <div className="w-full bg-gray-100 rounded-lg"></div>
    </div>
  );
};
