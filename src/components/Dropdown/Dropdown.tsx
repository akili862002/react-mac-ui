import React, { Fragment } from "react";
import { createContext, PropsWithChildren, ReactNode, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import Ripple from "material-ripple-effects";
import { cn } from "../../utils/classnames.utils";

const ripple = new Ripple();

export type IDropdownPosition = "left" | "right";

const DropdownContext = createContext<{ position: IDropdownPosition }>({
  position: "left",
});
const useDropdown = () => useContext(DropdownContext);

export const Dropdown = ({
  children,
  className,
  position = "left",
}: PropsWithChildren<{
  position?: IDropdownPosition;
  className?: string;
}>) => {
  return (
    <DropdownContext.Provider
      value={{
        position,
      }}
    >
      <Menu className={cn("relative", className)} as="div">
        {children}
      </Menu>
    </DropdownContext.Provider>
  );
};

type IDropdownButtonArgs = {
  open: boolean;
};

Dropdown.Button = ({
  children,
  className,
}: {
  className?: string | ((args: IDropdownButtonArgs) => string) | undefined;
  children: ReactNode | ((args: IDropdownButtonArgs) => ReactNode);
}) => {
  return (
    <Menu.Button
      as="button"
      onMouseDown={(e) => ripple.create(e, "dark")}
      className={({ open }) =>
        isFunction(className) ? className({ open }) : className
      }
    >
      {({ open }) =>
        (isFunction(children) ? children({ open }) : children) as any
      }
    </Menu.Button>
  );
};

Dropdown.Items = ({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) => {
  const { position } = useDropdown();

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        className={cn(
          " bg-white p-0.5 max-h-50 overflow-y-auto text-gray-800 z-40 shadow-md border absolute mt-0.5 w-full rounded-lg outline-none",
          "w-25",
          position === "left" && "left-0 origin-top-left",
          position === "right" && "right-0 origin-top-right",
          className
        )}
      >
        {children}
      </Menu.Items>
    </Transition>
  );
};

type IDropdownButtonItem = {
  active: boolean;
};

Dropdown.Item = ({
  children,
  className = "",
  ...rest
}: PropsWithChildren<
  React.DOMAttributes<HTMLButtonElement> & {
    className?: string | ((args: IDropdownButtonItem) => string) | undefined;
    children: ReactNode | ((args: IDropdownButtonItem) => ReactNode);
  }
>) => {
  return (
    <Menu.Item
      as="button"
      className={({ active }) =>
        cn(
          "px-1 w-full py-[7px] cursor-pointer rounded-lg relative text-left",
          active && "hover:bg-gray-100",
          "w-full",
          isFunction(className) ? className({ active }) : className
        )
      }
      onMouseDown={(e) => ripple.create(e, "dark")}
      {...rest}
    >
      {({ active }) =>
        (isFunction(children) ? children({ active }) : children) as any
      }
    </Menu.Item>
  );
};

Dropdown.ItemStatic = ({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={cn("px-1 py-1", className)}>{children}</div>;
};

const isFunction = (value: any): value is Function => {
  return typeof value === "function";
};
