import { isNil, prop as ramdaProp } from 'ramda'

function internalFn<T, K extends keyof T>(
  prop: K,
  comparator: (objA: T[K], objB: T[K]) => boolean,
  objA: T
): (objB: T) => boolean {
  return function (objB: T): boolean {
    return comparator(ramdaProp(prop, objA), ramdaProp(prop, objB))
  }
}

export function eqPropsWith<T, K extends keyof T>(
  prop: K,
  comparator: (objA: T[K], objB: T[K]) => boolean,
  objA: T,
  objB: T
): boolean
export function eqPropsWith<T, K extends keyof T>(
  prop: K,
  comparator: (objA: T[K], objB: T[K]) => boolean,
  objA: T
): (objB: T) => boolean
export function eqPropsWith<T, K extends keyof T>(
  prop: K,
  comparator: (objA: T[K], objB: T[K]) => boolean,
  objA: T,
  objB?: T
): boolean | ((objB: T) => boolean) {
  if (isNil(objB)) {
    return internalFn<T, K>(prop, comparator, objA)
  }
  return internalFn<T, K>(prop, comparator, objA)(objB)
}
