import { Listbox } from "@headlessui/react";
import Fuse from "fuse.js";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../../utils/classnames.utils";
import {
  FormControl,
  getBaseFieldClassName,
  IFormControlProps,
  listboxStyle,
} from "../FormControl";
import { UpDownIcon } from "./icons";

export type IBaseSelectProps<T> = IFormControlProps & {
  className?: string;
  buttonClassName?: string;
  optionsClassName?: string;
  placeholder?: string;
  optionSelected: T | null;
  options: T[];
  iconLeft?: ReactNode;
  renderOption: (option: T, active: boolean) => ReactNode;
  renderButton?: (option: T, open: boolean) => ReactNode;
  onSelect: (option: T) => void;
  validate?: (value: T) => string | undefined | null;
  onFilter?: (searchText: string, listOptions: T[]) => T[] | Promise<T[]>;
} & (
    | {
        autocomplete: true;
        filterKeys: (keyof T)[];
        limitDisplayOptions?: number;
      }
    | {
        autocomplete?: false | undefined;
        readonly filterKeys?: undefined;
        readonly limitDisplayOptions?: undefined;
      }
  );

export const BaseSelect = <T,>(props: IBaseSelectProps<T>) => {
  const {
    className,
    buttonClassName,
    options = [],
    optionSelected,
    optionsClassName,
    placeholder = "",
    autocomplete = false,
    filterKeys = ["name"],
    iconLeft = null,
    limitDisplayOptions,
    renderButton,
    renderOption,
    onFilter,
    validate,
    onSelect,

    ...formControlProps
  } = props;

  const error = validate?.(optionSelected as T);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<T[]>(options);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    handleFilter();
  }, [query, options]);

  const handleFilter = async () => {
    try {
      setLoading(true);
      const filteredOptions =
        (await onFilter?.(query, options)) ||
        filterWithFuse(query, options, filterKeys as any);
      setFilteredOptions(filteredOptions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (option: T) => {
    onSelect && onSelect(option);
    setQuery("");
  };

  let subArray = filteredOptions;
  if (typeof limitDisplayOptions !== "undefined" && limitDisplayOptions > 0) {
    subArray =
      filteredOptions.length > 0
        ? filteredOptions.slice(0, limitDisplayOptions)
        : [];
  }

  return (
    <FormControl
      className={cn("relative w-full", className)}
      {...formControlProps}
    >
      <Listbox value={optionSelected} onChange={handleSelect}>
        <div className={"relative w-full"}>
          <Listbox.Button
            as="button"
            className={({ open }) =>
              cn(
                listboxStyle.button(open, !!error),
                "relative",
                buttonClassName
              )
            }
          >
            {({ open }) => (
              <>
                {iconLeft && <div className="mr-1">{iconLeft}</div>}
                {optionSelected ? (
                  renderButton?.(optionSelected, open) ||
                  renderOption(optionSelected, false)
                ) : (
                  <span className="placeholder">{placeholder}</span>
                )}
                <UpDownIcon
                  className={cn(
                    "icon-sm text-gray-500 rotate-0 duration-150 flex-shrink-0",
                    "absolute right-1"
                  )}
                />
              </>
            )}
          </Listbox.Button>
          <Listbox.Options
            as="ul"
            className={listboxStyle.optionContainer(optionsClassName)}
          >
            {autocomplete && (
              <AutocompleteInput value={query} onChange={setQuery} />
            )}
            {subArray?.map((option, index) => (
              <Listbox.Option
                as="div"
                key={index}
                value={option}
                className={({ active, selected }) =>
                  listboxStyle.option(active, selected)
                }
              >
                {({ selected, active }) =>
                  renderOption(option, active || selected) as any
                }
              </Listbox.Option>
            ))}
            {/* {!subArray.length && <EmptyDataSelect />} */}

            {loading && (
              <div className="space-y-1">
                <SkeletonLine />
                <SkeletonLine />
                <SkeletonLine />
                <SkeletonLine />
                <SkeletonLine />
                <SkeletonLine />
              </div>
            )}
          </Listbox.Options>
        </div>
      </Listbox>
    </FormControl>
  );
};

const AutocompleteInput: React.FC<{
  value: string;
  onChange: (val: string) => void;
}> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  }, []);

  return (
    <input
      ref={inputRef}
      className={cn(getBaseFieldClassName({}), "h-3 my-0.5")}
      autoFocus
      autoComplete="off"
      value={value}
      placeholder="Search..."
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        const exceptKeys = [
          "Enter",
          "Esc",
          "Home",
          "End",
          "ArrowUp",
          "ArrowDown",
        ];
        if (!exceptKeys.includes(e.key)) {
          e.stopPropagation();
        }
      }}
    />
  );
};

export const filterWithFuse = <T,>(
  query: string,
  options: T[],
  filterKeys: (keyof T)[]
): T[] => {
  if (!query) return options;

  const fuse = new Fuse(options, {
    keys: filterKeys as string[],
    threshold: 0.6,
  });
  const fuseFiltered = fuse.search(query);
  return fuseFiltered.map((item) => item.item);
};

const SkeletonLine: React.FC = (props) => {
  return <div className="h-3 bg-gray-100 rounded-lg"></div>;
};
