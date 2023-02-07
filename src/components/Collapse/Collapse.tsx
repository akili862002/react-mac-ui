import React from "react";
import { isFunction } from "formik";
import { BaseCollapse } from "./BaseCollapse";
import { cn } from "../../utils/classnames.utils";
import { DownArrowIcon } from "../../common/icons/FormControl.icons";

export interface ICollapseProps extends React.PropsWithChildren {
  className?: string;
  initOpen?: boolean;
}

export interface ICollapseRef {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollapseContext = React.createContext<ICollapseRef>(null);
const useCollapse = () => React.useContext(CollapseContext);

const InnerCollapse = (
  { initOpen = false, className, children }: ICollapseProps,
  ref: React.ForwardedRef<ICollapseRef>
) => {
  const [open, setOpen] = React.useState(initOpen);

  React.useImperativeHandle(ref, () => ({
    open,
    setOpen,
  }));

  return (
    <CollapseContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      <div className={cn("w-full", className)}>{children}</div>
    </CollapseContext.Provider>
  );
};

export const CollapseRoot = React.forwardRef(InnerCollapse) as any as (
  props: ICollapseProps & {
    ref?: React.ForwardedRef<ICollapseRef>;
  }
) => ReturnType<typeof InnerCollapse>;

const CollapseButton: React.FC<{
  className?: string | ((props: ICollapseRef) => string);
  children: React.ReactNode | ((props: ICollapseRef) => React.ReactNode);
  /**
   * Set false to disable arrow
   * @default true
   */
  hasArrow?: boolean;
}> = ({ children, className, hasArrow = true, ...rest }) => {
  const { open, setOpen } = useCollapse();
  return (
    <button
      type="button"
      className={cn(
        "relative p-1",
        isFunction(className) ? className({ open, setOpen }) : className
      )}
      onClick={() => setOpen((prev) => !prev)}
      {...rest}
    >
      {isFunction(children) ? children?.({ open, setOpen }) : children}
      {hasArrow && (
        <DownArrowIcon
          className={cn(
            "absolute icon-md right-1 top-1/2 -translate-y-1/2",
            open && "rotate-180"
          )}
        />
      )}
    </button>
  );
};

const CollapsePanel: React.FC<{
  className?: string | ((props: ICollapseRef) => string);
  children: ((props: ICollapseRef) => React.ReactNode) | React.ReactNode;
}> = ({ className, children }) => {
  const { open, setOpen } = useCollapse();
  return (
    <BaseCollapse open={open}>
      <div
        className={cn(
          "p-1 w-full",
          isFunction(className) ? className({ open, setOpen }) : className
        )}
      >
        {isFunction(children) ? children?.({ open, setOpen }) : children}
      </div>
    </BaseCollapse>
  );
};

export const Collapse = Object.assign(CollapseRoot, {
  Button: CollapseButton,
  Panel: CollapsePanel,
});
