import { isNil, map, type NonEmptyArray } from 'ramda'

function internalFn<T, U>(mapper: (obj: T) => U) {
  return function (list: NonEmptyArray<T>): NonEmptyArray<U> {
    return map<T, U>(mapper, list) as NonEmptyArray<U>
  }
}

export function nonEmptyMap<T, U>(mapper: (obj: T) => U): (list: NonEmptyArray<T>) => NonEmptyArray<U>
export function nonEmptyMap<T, U>(mapper: (obj: T) => U, list: NonEmptyArray<T>): NonEmptyArray<U>
export function nonEmptyMap<T, U>(
  mapper: (obj: T) => U,
  list?: NonEmptyArray<T>
): NonEmptyArray<U> | ((list: NonEmptyArray<T>) => NonEmptyArray<U>) {
  if (isNil(list)) {
    return internalFn<T, U>(mapper)
  }
  return internalFn<T, U>(mapper)(list)
}
