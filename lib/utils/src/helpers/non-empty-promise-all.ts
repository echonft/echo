import type { NonEmptyArray } from 'ramda'

export function nonEmptyPromiseAll<T>(promises: NonEmptyArray<Promise<T>>): Promise<NonEmptyArray<T>> {
  return Promise.all(promises)
}
