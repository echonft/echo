import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { isEmpty, unless } from 'ramda'

export function unlessEmpty<T, U>(whenNotEmpty: (nonEmptyArray: NonEmptyArray<T>) => U): (obj: T[]) => U {
  return unless(isEmpty, whenNotEmpty) as (obj: T[]) => U
}
