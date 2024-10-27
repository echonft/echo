export function stringComparator<T extends string>(strA: T, strB: T) {
  return strA.localeCompare(strB)
}
