import { differenceWith, isEmpty, isNil, length, pipe } from 'ramda'

type Comparator<T> = (a: T, b: T) => boolean
type InnerFnReturn<T> = (list: T[]) => boolean

function innerEqListWith<T>(comparator: Comparator<T>, listA: T[]): InnerFnReturn<T> {
  return function (listB: T[]): boolean {
    const listALength = length(listA)
    if (listALength !== length(listB)) {
      return false
    }
    return pipe(differenceWith<T, T>, isEmpty)(comparator, listA, listB)
  }
}

export function eqListWith<T>(comparator: Comparator<T>, listA: T[]): InnerFnReturn<T>
export function eqListWith<T>(comparator: Comparator<T>, listA: T[], listB: T[]): boolean
export function eqListWith<T>(comparator: Comparator<T>, listA: T[], listB?: T[]): boolean | InnerFnReturn<T> {
  if (isNil(listB)) {
    return innerEqListWith(comparator, listA)
  }
  return innerEqListWith(comparator, listA)(listB)
}
