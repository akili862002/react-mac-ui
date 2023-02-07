export const has = <T>(
  arr: T[],
  item: T,
  isEqual?: (a: T, b: T) => boolean
) => {
  for (let currItem of arr) {
    if (
      isEqual?.(item, currItem) ||
      JSON.stringify(item) === JSON.stringify(currItem)
    )
      return true;
  }
  return false;
};
