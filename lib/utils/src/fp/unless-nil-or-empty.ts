import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { unless } from 'ramda'

export function unlessNilOrEmpty<T, U>(
  whenNotNilOrEmpty: (notNilObj: NonNullable<T>) => U
): (obj: Nullable<T>) => Nullable<U> {
  return unless(isNilOrEmpty, whenNotNilOrEmpty) as (obj: Nullable<T>) => Nullable<U>
}
