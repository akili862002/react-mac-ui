import { useMemo, useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useAsync } from "./useAsync";

// Generic reusable hook
export function useDebounced<T = any>(
  searchFunction: (text: string) => void,
  timeDebounced = 300,
  deps: any[] = [],
) {
  const [inputText, setInputText] = useState("");

  const debouncedSearchFunction = useMemo<any>(
    () => AwesomeDebouncePromise(searchFunction, timeDebounced),
    deps,
  );

  const searchResults = useAsync(async () => {
    if (!inputText.length) {
      return [];
    } else {
      return (debouncedSearchFunction(inputText) as T[]) || [];
    }
  }, [debouncedSearchFunction, inputText]);

  return {
    inputText,
    setInputText,
    searchResults,
  };
}
