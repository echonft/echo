import { differenceWith, isEmpty, isNil, length, pipe } from 'ramda'

type Predicate<T> = (a: T, b: T) => boolean
type InnerFnReturn<T> = (listB: T[]) => boolean
function innerEqListWith<T>(pred: Predicate<T>, listA: T[]): InnerFnReturn<T> {
  return function (listB: T[]): boolean {
    const listALength = length(listA)
    if (listALength !== length(listB)) {
      return false
    }
    return pipe(differenceWith<T, T>, isEmpty)(pred, listA, listB)
  }
}

export function eqListWith<T>(pred: Predicate<T>, listA: T[]): InnerFnReturn<T>
export function eqListWith<T>(pred: Predicate<T>, listA: T[], listB: T[]): boolean
export function eqListWith<T>(pred: Predicate<T>, listA: T[], listB?: T[]): boolean | InnerFnReturn<T> {
  if (isNil(listB)) {
    return innerEqListWith(pred, listA)
  }
  return innerEqListWith(pred, listA)(listB)
}
