import { isInWith } from '@echo/utils/helpers/is-in-with'
import { isNil } from 'ramda'

function innerIncludesWith<T>(obj: T, comparator: (objA: T, objB: T) => boolean) {
  return function (list: readonly T[]): boolean {
    return isInWith<T>(list, comparator, obj)
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
    return innerIncludesWith<T>(obj, comparator)
  }
  return innerIncludesWith<T>(obj, comparator)(list)
}
