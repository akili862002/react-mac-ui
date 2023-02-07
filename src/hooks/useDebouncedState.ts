import { useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useConstant } from "./useConstant";
import { useAsync } from "./useAsync";

export function useDebouncedState<T = any>(
  defaultValue: T,
  callback: (state: T) => void,
  timeDebounced = 300
): [T, (val: T) => void] {
  const [state, setState] = useState<T>(defaultValue);

  const callbackFunc = useConstant<any>(() =>
    AwesomeDebouncePromise(callback, timeDebounced)
  );

  useAsync(async () => {
    callbackFunc(state) as T[];
  }, [callbackFunc, state]);

  return [state, setState];
}
