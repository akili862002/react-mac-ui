import { CSSProperties, RefObject, useEffect, useRef, useState } from "react";
import { isBrowser } from "../utils/env.utils";
import { off, on } from "../utils/mics.utils";
import { useMountedState } from "./useMountedState";
import { useSetState } from "./useSetState";

export interface State {
  isSliding: boolean;
  value: number;
}

export interface Options {
  step: number;
  initValue: number;
  reverse: boolean;
  styles: boolean | CSSProperties;
  vertical?: boolean;
  onScrub: (value: number) => void;
  onScrubStart: () => void;
  onScrubStop: (value: number) => void;
}

export const useSlider = (
  ref: RefObject<HTMLElement>,
  options: Partial<Options> = {}
) => {
  const isMounted = useMountedState();
  const isSliding = useRef(false);
  const valueRef = useRef(0);
  const frame = useRef(0);
  const [state, setState] = useSetState<State>({
    isSliding: false,
    value: options?.initValue || 0,
  });

  valueRef.current = state.value;

  useEffect(() => {
    if (!isBrowser) return;
    const points = createPointsByStep(options.step);

    const styles = options.styles === undefined ? true : options.styles;
    const reverse = options.reverse === undefined ? false : options.reverse;

    if (ref.current && styles) {
      ref.current.style.userSelect = "none";
    }

    const startScrubbing = () => {
      if (!isSliding.current && isMounted()) {
        options.onScrubStart?.();
        isSliding.current = true;
        setState({ isSliding: true });
        bindEvents();
      }
    };

    const stopScrubbing = () => {
      if (isSliding.current && isMounted()) {
        options.onScrubStop?.(valueRef.current);
        isSliding.current = false;
        setState({ isSliding: false });
        unbindEvents();
      }
    };

    const onMouseDown = (event: MouseEvent) => {
      startScrubbing();
      onMouseMove(event);
    };
    const onMouseMove = options.vertical
      ? (event: MouseEvent) => onScrub(event.clientY)
      : (event: MouseEvent) => onScrub(event.clientX);

    const onTouchStart = (event: TouchEvent) => {
      startScrubbing();
      onTouchMove(event);
    };
    const onTouchMove = options.vertical
      ? (event: TouchEvent) => onScrub(event.changedTouches[0].clientY)
      : (event: TouchEvent) => onScrub(event.changedTouches[0].clientX);

    const bindEvents = () => {
      on(document, "mousemove", onMouseMove);
      on(document, "mouseup", stopScrubbing);

      on(document, "touchmove", onTouchMove);
      on(document, "touchend", stopScrubbing);
    };

    const unbindEvents = () => {
      off(document, "mousemove", onMouseMove);
      off(document, "mouseup", stopScrubbing);

      off(document, "touchmove", onTouchMove);
      off(document, "touchend", stopScrubbing);
    };

    const onScrub = (clientXY: number) => {
      cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        if (isMounted() && ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const pos = options.vertical ? rect.top : rect.left;
          const length = options.vertical ? rect.height : rect.width;

          // Prevent returning 0 when element is hidden by CSS
          if (!length) {
            return;
          }

          let value = (clientXY - pos) / length;

          if (value > 1) {
            value = 1;
          } else if (value < 0) {
            value = 0;
          }

          if (reverse) {
            value = 1 - value;
          }

          value = findNearestPoint(value, points);

          setState({
            value,
          });

          options.onScrub?.(value);
        }
      });
    };

    on(ref.current, "mousedown", onMouseDown);
    on(ref.current, "touchstart", onTouchStart);

    return () => {
      off(ref.current, "mousedown", onMouseDown);
      off(ref.current, "touchstart", onTouchStart);
    };
  }, [ref, options.vertical, options.step]);

  const setValue = (val: number) => {
    setState({ value: val });
  };

  return { ...state, setValue };
};

const createPointsByStep = (step: number) => {
  const res: number[] = [];
  let count = 0;
  while (count < 1) {
    res.push(count);
    count += step;
  }
  res.push(1);
  return res;
};

const findNearestPoint = (value: number, points: number[]) => {
  let res = 0;
  let dental = 1;
  for (let point of points) {
    const currDental = Math.abs(point - value);
    if (dental > currDental) {
      dental = currDental;
      res = point;
    }
  }
  return res;
};
