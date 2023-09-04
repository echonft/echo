import { always, ifElse, intersection, isEmpty, isNil, not, pipe } from 'ramda'

function internalFn<T = unknown>(listA: T[]): (listB: T[]) => boolean {
  return ifElse(
    always(isNil(listA)),
    always(false),
    ifElse(isNil, always(false), pipe(intersection<T>(listA), isEmpty, not))
  )
}

export function intersects<T = unknown>(listA: T[], listB: T[]): boolean
export function intersects<T = unknown>(listA: T[]): (listB: T[]) => boolean
export function intersects<T = unknown>(listA: T[], listB?: T[]): boolean | ((listB: T[]) => boolean) {
  if (isNil(listB)) {
    return internalFn(listA)
  }
  return internalFn(listA)(listB)
}
