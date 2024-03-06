import { isInWith } from '@echo/utils/fp/is-in-with'
import { isNil } from 'ramda'

function internalFn<T>(obj: T, comparator: (objA: T, objB: T) => boolean) {
  return function (list: readonly T[]): boolean {
    return isInWith(list, comparator, obj)
  }
}

export function includesWith<T>(obj: T, comparator: (objA: T, objB: T) => boolean): (list: readonly T[]) => boolean
export function includesWith<T>(obj: T, comparator: (objA: T, objB: T) => boolean, list: readonly T[]): boolean
export function includesWith<T>(
  obj: T,
  comparator: (objA: T, objB: T) => boolean,
  list?: readonly T[]
): boolean | ((list: readonly T[]) => boolean) {
  if (isNil(list)) {
    return internalFn<T>(obj, comparator)
  }
  return internalFn<T>(obj, comparator)(list)
}
