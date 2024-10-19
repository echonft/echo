import { concat, isNil, type NonEmptyArray } from 'ramda'

function internalFn<T>(listA: NonEmptyArray<T>) {
  return function (listB: NonEmptyArray<T>): NonEmptyArray<T> {
    return concat<T, T>(listA, listB) as NonEmptyArray<T>
  }
}

export function nonEmptyConcat<T>(listA: NonEmptyArray<T>): (listB: NonEmptyArray<T>) => NonEmptyArray<T>
export function nonEmptyConcat<T>(listA: NonEmptyArray<T>, listB: NonEmptyArray<T>): NonEmptyArray<T>
export function nonEmptyConcat<T>(
  listA: NonEmptyArray<T>,
  listB?: NonEmptyArray<T>
): NonEmptyArray<T> | ((listB: NonEmptyArray<T>) => NonEmptyArray<T>) {
  if (isNil(listB)) {
    return internalFn<T>(listA)
  }
  return internalFn<T>(listA)(listB)
}
