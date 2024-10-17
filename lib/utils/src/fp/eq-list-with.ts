import { differenceWith, isEmpty, isNil, length, pipe } from 'ramda'

type Predicate<T> = (a: T, b: T) => boolean
type FnReturn<T> = (listB: T[]) => boolean
function internalFn<T>(pred: Predicate<T>, listA: T[]): FnReturn<T> {
  return function (listB: T[]): boolean {
    const listALength = length(listA)
    if (listALength !== length(listB)) {
      return false
    }
    return pipe(differenceWith<T, T>, isEmpty)(pred, listA, listB)
  }
}

export function eqListWith<T>(pred: Predicate<T>, listA: T[]): FnReturn<T>
export function eqListWith<T>(pred: Predicate<T>, listA: T[], listB: T[]): boolean
export function eqListWith<T>(pred: Predicate<T>, listA: T[], listB?: T[]): boolean | FnReturn<T> {
  if (isNil(listB)) {
    return internalFn(pred, listA)
  }
  return internalFn(pred, listA)(listB)
}
