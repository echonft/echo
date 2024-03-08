import { any, isNil, partial } from 'ramda'

function internalFn<T>(list: readonly T[], comparator: (objA: T, objB: T) => boolean) {
  return function (obj: T): boolean {
    return any(partial(comparator, [obj]), list)
  }
}

export function isInWith<T>(list: readonly T[], comparator: (objA: T, objB: T) => boolean): (obj: T) => boolean
export function isInWith<T>(list: readonly T[], comparator: (objA: T, objB: T) => boolean, obj: T): boolean
export function isInWith<T>(
  list: readonly T[],
  comparator: (objA: T, objB: T) => boolean,
  obj?: T
): boolean | ((obj: T) => boolean) {
  if (isNil(obj)) {
    return internalFn<T>(list, comparator)
  }
  return internalFn<T>(list, comparator)(obj)
}
