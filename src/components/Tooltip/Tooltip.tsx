import React from "react";
import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  useState,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { randomId } from "../../utils/random.utils";

export interface ITooltipProps extends PropsWithChildren {
  tooltip: string | number;
  /**
   * @unit millisecond
   */
  delay?: number;
  /**
   * Select default direction of tooltip
   */
  place?: "top" | "right" | "bottom" | "left";
}

export const Tooltip: React.FC<ITooltipProps> = ({
  children,
  tooltip,
  delay,
  place = "bottom",
}) => {
  if (!isValidElement(children)) return null;
  if (!tooltip) return children;

  const id = useMemo(() => randomId(), []);

  const [postal] = useState(() => {
    return createPortal(
      <ReactTooltip
        variant="light"
        delayShow={delay}
        className="!px-1 !text-sm !py-0"
        place={place}
        anchorId={id}
        aria-haspopup="true"
        data-html={true}
      />,
      document.body
    );
  });

  const attributes = {
    id: id,
    "data-tooltip-content": tooltip,
  };

  return (
    <>
      {cloneElement(children, {
        ...attributes,
      })}
      {postal}
    </>
  );
};
