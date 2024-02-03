import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, unless } from 'ramda'

export function unlessNil<T, U>(whenNotNil: (notNilObj: NonNullable<T>) => U): (obj: Nullable<T>) => Nullable<U> {
  return unless(isNil, whenNotNil) as (obj: Nullable<T>) => Nullable<U>
}
