import { isNil, prop as ramdaProp } from 'ramda'

function innerEqPropsWith<T, K extends keyof T>(
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
    return innerEqPropsWith<T, K>(prop, comparator, objA)
  }
  return innerEqPropsWith<T, K>(prop, comparator, objA)(objB)
}
