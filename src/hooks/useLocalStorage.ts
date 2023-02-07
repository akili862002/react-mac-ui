import EventEmitter from "events";
import { useCallback, useEffect, useState } from "react";

const eventManager = new EventEmitter();

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [invokeUpdateAllUsingHook, setInvokeUpdateAllUsingHook] =
    useState(false);
  const eventKey = `LocalStorage-${key}`;

  useEffect(() => {
    const item = window.localStorage.getItem(key);
    setStoredValue(item ? JSON.parse(item) : initialValue);
  }, []);

  useEffect(() => {
    eventManager.on(eventKey, () => {
      setInvokeUpdateAllUsingHook(true);
    });
  }, []);

  useEffect(() => {
    if (!invokeUpdateAllUsingHook) return;
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(JSON.parse(item ? item : "") || initialValue);
    } catch (error) {
      console.error(error);
    } finally {
      setInvokeUpdateAllUsingHook(false);
    }
  }, [invokeUpdateAllUsingHook]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));

        eventManager.emit(eventKey);
      } catch (error) {
        console.error(error);
      }
    },
    [key]
  );

  return [storedValue, setValue] as const;
};
