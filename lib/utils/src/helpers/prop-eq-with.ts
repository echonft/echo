import { isNil, prop as ramdaProp } from 'ramda'

type Comparator<T, K extends keyof T> = (a: T[K], b: T[K]) => boolean
type InnerFnReturn<T> = (obj: T) => boolean

function innerPropEqWith<T, K extends keyof T>(prop: K, value: T[K], comparator: Comparator<T, K>): InnerFnReturn<T> {
  return function (obj: T) {
    return comparator(ramdaProp(prop, obj), value)
  }
}

export function propEqWith<T, K extends keyof T>(prop: K, value: T[K], comparator: Comparator<T, K>, obj: T): boolean
export function propEqWith<T, K extends keyof T>(prop: K, value: T[K], comparator: Comparator<T, K>): InnerFnReturn<T>
export function propEqWith<T, K extends keyof T>(
  prop: K,
  value: T[K],
  comparator: Comparator<T, K>,
  obj?: T
): boolean | InnerFnReturn<T> {
  if (isNil(obj)) {
    return innerPropEqWith<T, K>(prop, value, comparator)
  }
  return innerPropEqWith<T, K>(prop, value, comparator)(obj)
}
