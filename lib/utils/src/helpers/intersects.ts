import { always, ifElse, intersection, isEmpty, isNil, not, pipe } from 'ramda'

function innerIntersects<T = unknown>(listA: T[]): (listB: T[]) => boolean {
  return ifElse<[T[]], boolean, boolean>(
    always(isNil(listA)),
    always(false),
    ifElse(isNil, always(false), pipe(intersection<T>(listA), isEmpty, not))
  )
}

export function intersects<T = unknown>(listA: T[], listB: T[]): boolean
export function intersects<T = unknown>(listA: T[]): (listB: T[]) => boolean
export function intersects<T = unknown>(listA: T[], listB?: T[]): boolean | ((listB: T[]) => boolean) {
  if (isNil(listB)) {
    return innerIntersects(listA)
  }
  return innerIntersects(listA)(listB)
}
