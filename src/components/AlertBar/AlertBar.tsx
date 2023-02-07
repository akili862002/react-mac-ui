import React, { useMemo } from "react";
import { Transition } from "@headlessui/react";
import EventEmitter from "events";
import { Fragment, useEffect, useState } from "react";
import { CloseIcon } from "./AlertBar.icons";
import { cn } from "../../utils/classnames.utils";
import { randomId } from "../../utils/random.utils";

export type IAlertBarType = "info" | "error" | "warning" | "success";

export interface IAlertBarPayload {
  type: IAlertBarType;
  message: React.ReactNode | null;
}

export interface IAlertBarProps {
  id: string;
  className?: string;
}

const eventManager = new EventEmitter();

export const alertBar = (id: string) => {
  return {
    info: (message: React.ReactNode) => {
      eventManager.emit(id, {
        type: "info",
        message,
      });
    },
    error: (message: React.ReactNode) => {
      eventManager.emit(id, {
        type: "error",
        message,
      });
    },
    warning: (message: React.ReactNode) => {
      eventManager.emit(id, {
        type: "warning",
        message,
      });
    },
    success: (message: React.ReactNode) => {
      eventManager.emit(id, {
        type: "success",
        message,
      });
    },
  };
};

export const useAlertBar = () => {
  const id = useMemo(() => randomId(), []);
  const AlertBarComponent = useMemo(() => <AlertBar id={id} />, []);
  return [alertBar(id), AlertBarComponent] as const;
};

export const AlertBar: React.FC<IAlertBarProps> = ({ id, className = "" }) => {
  const [payload, setPayload] = useState<IAlertBarPayload | null>(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    eventManager.on(id, (payload) => {
      if (!payload?.message) {
        handleClose();
      } else {
        setIsShow(true);
        setPayload(payload);
      }
    });
  }, []);

  const { type } = payload || {};

  const handleClose = () => {
    setIsShow(false);
    setTimeout(() => {
      setPayload(null);
    }, 200);
  };

  return (
    <Transition
      show={isShow}
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition ease-out duration-100"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
    >
      <div
        className={cn(
          "flex px-1 py-1 my-1 font-medium rounded-lg",
          {
            "text-gray-700 bg-gray-100": type === "info",
            "text-red-600 bg-red-100": type === "error",
            "text-green-700 bg-green-100": type === "success",
            "text-yellow-600 bg-yellow-100": type === "warning",
          },
          className
        )}
      >
        <div>
          <h5>{payload?.message}</h5>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="pl-1 ml-auto mr-0 h-fit hover:bg-opacity-60"
        >
          <CloseIcon className={"flex-shrink-0 icon-sm"} />
        </button>
      </div>
    </Transition>
  );
};
