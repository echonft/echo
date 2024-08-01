import { intersection, isNil, map, pipe } from 'ramda'

export function intersectionBy<T, U>(pred: (a: T) => U, listA: T[]): (listB: T[]) => U[]
export function intersectionBy<T, U>(pred: (a: T) => U, listA: T[], listB: T[]): U[]
export function intersectionBy<T, U>(pred: (a: T) => U, listA: T[], listB?: T[]): ((listB: T[]) => U[]) | U[] {
  if (isNil(listB)) {
    return pipe(map<T, U>(pred), intersection<U>(map<T, U>(pred, listA)))
  }
  return intersection(map<T, U>(pred, listA), map<T, U>(pred, listB))
}
