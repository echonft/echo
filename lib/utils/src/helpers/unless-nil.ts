import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, unless } from 'ramda'

function innerUnlessNil<T, U>(whenNotNil: (notNilObj: NonNullable<T>) => U) {
  return unless(isNil, whenNotNil) as (obj: Nullable<T>) => Nullable<U>
}

export function unlessNil<T, U>(whenNotNil: (notNilObj: NonNullable<T>) => U): (obj: Nullable<T>) => Nullable<U>
export function unlessNil<T, U>(whenNotNil: (notNilObj: NonNullable<T>) => U, obj: Nullable<T>): Nullable<U>
export function unlessNil<T, U>(
  whenNotNil: (notNilObj: NonNullable<T>) => U,
  obj?: Nullable<T>
): Nullable<U> | ((obj: Nullable<T>) => Nullable<U>) {
  if (isNil(obj)) {
    return innerUnlessNil<T, U>(whenNotNil)
  }
  return innerUnlessNil<T, U>(whenNotNil)(obj)
}
