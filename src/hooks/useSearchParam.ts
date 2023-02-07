import { useEffect, useState } from "react";
import { isBrowser } from "../utils/env.utils";
import { off, on } from "../utils/mics.utils";

const getValue = (search: string, param: string) =>
  new URLSearchParams(search).get(param);

export type UseQueryParam = (param: string) => string | null;

/**
 * Tracks browser's location search param.
 * @docs https://streamich.github.io/react-use/?path=/story/sensors-usesearchparam--docs
 * @demo https://streamich.github.io/react-use/?path=/story/sensors-usesearchparam--demo
 */
export const useSearchParam: UseQueryParam = (param) => {
  if (!isBrowser) return null;

  const location = window.location;
  const [value, setValue] = useState<string | null>(() =>
    getValue(location.search, param)
  );

  useEffect(() => {
    const onChange = () => {
      setValue(getValue(location.search, param));
    };

    on(window, "popstate", onChange);
    on(window, "pushstate", onChange);
    on(window, "replacestate", onChange);

    return () => {
      off(window, "popstate", onChange);
      off(window, "pushstate", onChange);
      off(window, "replacestate", onChange);
    };
  }, []);

  return value;
};
