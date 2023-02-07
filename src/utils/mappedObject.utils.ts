/**
 * Omit keys of object
 * @returns new object exclude omitted keys
 * @example
 *  - omit({ name: "John", age: 1}, ["name"])
 *  return { age: 1 }
 */
export const omit = <T>(
  object: T,
  omitKeys: (keyof T)[]
): Exclude<T, typeof omitKeys> => {
  if (!omitKeys.length || !object) return object as any;
  const { [omitKeys.pop()]: omitted, ...rest } = object;
  return omit(rest as any, omitKeys);
};

/**
 * Pick keys of object
 * @returns new object with pickup keys
 * @example
 *  - pick({ name: "John", age: 1}, ["name"])
 *  return { name: "John" }
 */
export const pick = <T extends object, U extends keyof T>(
  obj: T,
  paths: Array<U>
): Pick<T, U> => {
  if (!obj) return obj;

  const ret = Object.create(null);
  for (const k of paths) {
    ret[k] = obj[k];
  }
  return ret;
};

export function copyObject<T>(value: T): T {
  if (!value || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(copyObject) as typeof value;
  }

  return Object.keys(value).reduce((acc, key) => {
    acc[key as keyof T] = copyObject(value[key as keyof T]);
    return acc;
  }, {} as T);
}
