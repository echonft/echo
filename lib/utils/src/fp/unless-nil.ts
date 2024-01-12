import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, unless } from 'ramda'

export function unlessNil<T, U>(whenFalseFn: (a: T) => U): (a: Nullable<T>) => U | undefined {
  return unless(isNil, whenFalseFn) as (a: Nullable<T>) => U | undefined
}
