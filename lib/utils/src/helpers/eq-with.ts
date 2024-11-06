import { isNil } from 'ramda'

type Comparator<T> = (a: T, b: T) => boolean
type InnerFnReturn<T> = (obj: T) => boolean

function innerEqWith<T>(comparator: Comparator<T>, objA: T) {
  return function (objB: T): boolean {
    return comparator(objA, objB)
  }
}

export function eqWith<T>(comparator: Comparator<T>, objA: T, objB: T): boolean
export function eqWith<T>(comparator: Comparator<T>, objA: T): InnerFnReturn<T>
export function eqWith<T>(comparator: Comparator<T>, objA: T, objB?: T): boolean | InnerFnReturn<T> {
  if (isNil(objB)) {
    return innerEqWith<T>(comparator, objA)
  }
  return innerEqWith<T>(comparator, objA)(objB)
}
