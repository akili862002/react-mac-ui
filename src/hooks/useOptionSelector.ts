import { useEffect, useState } from "react";

export const useOptionSelector = <T>(
  apiCaller: () => Promise<T[]> | T[],
  deps: any[] = []
) => {
  const [selected, setSelected] = useState<T | null>(null);
  const [options, setOptions] = useState<T[]>([]);

  useEffect(() => {
    const setDataFromAPI = async () => {
      try {
        const options = await apiCaller();
        setOptions(options);
      } catch (error) {
        console.log(error);
      }
    };
    setDataFromAPI();
  }, deps);

  return { selected, setSelected, options, setOptions };
};

export const useListOptionSelector = <T>(
  apiCaller: () => Promise<T[]> | T[],
  deps: any[] = []
) => {
  const [listSelected, setListSelected] = useState<T[]>([]);
  const [options, setOptions] = useState<T[]>([]);

  useEffect(() => {
    const setDataFromAPI = async () => {
      try {
        const options = await apiCaller();
        setOptions(options);
      } catch (error) {
        console.log(error);
      }
    };
    setDataFromAPI();
  }, deps);

  return {
    listSelected,
    setListSelected,
    options,
    setOptions,
  };
};
