import { differenceWith, isEmpty, length, pipe } from 'ramda'

export function eqListContentWith<T>(pred: (a: T, b: T) => boolean): (listA: T[], listB: T[]) => boolean {
  return function (listA: T[], listB: T[]): boolean {
    const listALength = length(listA)
    if (listALength !== length(listB)) {
      return false
    }
    return pipe(differenceWith<T, T>, isEmpty)(pred, listA, listB)
  }
}
