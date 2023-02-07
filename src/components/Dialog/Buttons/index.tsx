import React from "react";
import { PropsWithChildren } from "react";
import { cn } from "../../../utils/classnames.utils";
import { Button, IButtonProps } from "../../Button";
import { useDialogContext } from "../Dialog";

export interface _DialogIButtonsProps {}

export const _DialogButtons = ({
  children,
}: PropsWithChildren<_DialogIButtonsProps>) => {
  const childrenArray = React.Children.toArray(children);
  const cloned = childrenArray.map((child) => {
    return React.cloneElement(child as React.ReactElement, {
      className: "w-full",
    });
  });
  return (
    <div
      className={cn(
        "mx-1.5 gap-x-1.5 gap-y-1 pb-1.5 pt-1 mt-1 flex border-t",
        childrenArray.length > 2 ? "flex-col" : "flex-row"
      )}
    >
      {cloned}
    </div>
  );
};

_DialogButtons.CancelButton = ({
  children,
  ...rest
}: PropsWithChildren<IButtonProps>) => {
  const { closeDialog } = useDialogContext();
  return (
    <Button onClick={() => closeDialog()} variant="text" {...rest}>
      {children || "Cancel"}
    </Button>
  );
};
