import { prop as ramdaProp } from 'ramda'

export function eqPropsWith<T, K extends keyof T>(
  prop: K,
  comparator: (objA: T[K], objB: T[K]) => boolean,
  objA: T,
  objB: T
): boolean {
  return comparator(ramdaProp(prop, objA), ramdaProp(prop, objB))
}
