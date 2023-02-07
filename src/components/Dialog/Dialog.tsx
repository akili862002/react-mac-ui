import React from "react";
import { Fragment, PropsWithChildren, useContext, createContext } from "react";
import { Dialog as DialogUI, Transition } from "@headlessui/react";
import { _DialogHeader } from "./Header";
import { _DialogContent } from "./Content";
import { CloseIcon } from "./icons";
import { _DialogButtons } from "./Buttons";
import { cn } from "../../utils/classnames.utils";

export type IDialogSize = "sm" | "md" | "lg" | "auto" | "xl" | "full";

export interface IDialogProps {
  size?: IDialogSize;
  open: boolean | undefined;
  onClose: () => void;
  hideCloseButton?: boolean;
  className?: string;
}

const sizes: Record<IDialogSize, string> = /*tw*/ {
  sm: cn(" w-full max-w-[300px]"),
  md: cn(" w-full max-w-[420px]"),
  lg: cn(" w-full max-w-laptop"),
  xl: cn(" w-full max-w-desktop"),
  full: cn("w-screen h-screen"),
  auto: cn("w-auto"),
};

const DialogContext = createContext<{ closeDialog?: () => void }>({});
export const useDialogContext = () => useContext(DialogContext);

const DialogRoot: React.FC<PropsWithChildren<IDialogProps>> = (
  props
): JSX.Element => {
  const {
    size = "md",
    children,
    hideCloseButton,
    className = "",
    open,
    onClose,
  } = props;

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <DialogContext.Provider
      value={{
        closeDialog: handleClose,
      }}
    >
      <Transition show={open} as={Fragment}>
        <DialogUI as="div" className="relative z-100" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="min-h-full p-2 text-center center-children">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogUI.Panel
                  className={cn(
                    "inline-block bg-white relative text-left align-middle rounded-lg shadow-lg",
                    sizes[size],
                    className
                  )}
                  style={{ maxHeight: "calc(100vh - 40px)" }}
                >
                  {children}
                  {!hideCloseButton && (
                    <button
                      role={"button"}
                      className="absolute hover:bg-gray-100 p-0.5 rounded-md text-gray-400 hover:text-gray-800 right-1 top-1"
                      onClick={onClose}
                    >
                      <CloseIcon />
                    </button>
                  )}
                </DialogUI.Panel>
              </Transition.Child>
            </div>
          </div>
        </DialogUI>
      </Transition>
    </DialogContext.Provider>
  );
};

export const Dialog = Object.assign(DialogRoot, {
  Header: _DialogHeader,
  Content: _DialogContent,
  Buttons: _DialogButtons,
  CancelButton: _DialogButtons.CancelButton,
});
