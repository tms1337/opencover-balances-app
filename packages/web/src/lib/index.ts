import { useEffect } from "react";

export const useAsyncEffect = (fn: CallableFunction, when: any) => {
  useEffect(() => {
    const asyncEffect = async () => {
      await fn();
    };

    asyncEffect();
  }, when);
};

export const getActionWrapper =
  (state: any, setState: CallableFunction) =>
  (fn: CallableFunction) =>
  async (...x: any[]) => {
    try {
      setState({ ...state, isLoading: true });

      const result = await fn(...x);

      setState({ ...state, ...result, isLoading: false, isError: false });
    } catch (err) {
      setState({ ...state, isLoading: false, isError: true });
    }
  };

export type ObjType = {
  id: number;
  [key: string]: any;
};

export const mergeArraysById = (
  arr1: ObjType[],
  arr2: ObjType[]
): ObjType[] => {
  const map = new Map<number, ObjType>();

  arr1.forEach(item => map.set(item.id, item));
  arr2.forEach(item => {
    if (map.has(item.id)) {
      const existingItem = map.get(item.id);
      map.set(item.id, { ...existingItem, ...item });
    } else {
      map.set(item.id, item);
    }
  });

  return Array.from(map.values());
};

export const formatBalance = (value: number) => value.toLocaleString("en-US");
