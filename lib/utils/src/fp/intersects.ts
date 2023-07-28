import { always, ifElse, intersection, isEmpty, isNil, not, pipe } from 'ramda'

export const intersects = <T = unknown>(listA: T[]): ((listB: T[]) => boolean) =>
  ifElse(always(isNil(listA)), always(false), ifElse(isNil, always(false), pipe(intersection<T>(listA), isEmpty, not)))
