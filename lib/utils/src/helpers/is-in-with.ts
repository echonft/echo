import { any, isNil, partial } from 'ramda'

function innerIsInWith<T>(list: readonly T[], comparator: (objA: T, objB: T) => boolean) {
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
    return innerIsInWith<T>(list, comparator)
  }
  return innerIsInWith<T>(list, comparator)(obj)
}
