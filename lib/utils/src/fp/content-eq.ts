import { equals, intersection, isNil, length, pipe } from 'ramda'

function internalFn<T>(listA: T[]): (listB: T[]) => boolean {
  return function (listB: T[]) {
    if (!equals(length(listA), length(listB))) {
      return false
    }
    return equals(pipe(intersection, length)(listA, listB), length(listA))
  }
}

export function contentEq<T>(listA: T[], listB: T[]): boolean
export function contentEq<T>(listA: T[]): (listB: T[]) => boolean
export function contentEq<T>(listA: T[], listB?: T[]): boolean | ((listB: T[]) => boolean) {
  if (isNil(listB)) {
    return internalFn(listA)
  }
  return internalFn(listA)(listB)
}
