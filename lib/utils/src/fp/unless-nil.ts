import { isNil, unless } from 'ramda'

export function unlessNil<T, U>(whenNotNil: (notNilObj: NonNullable<T>) => U): (obj: T | undefined) => U | undefined {
  return unless(isNil, whenNotNil) as (obj: T | undefined) => U | undefined
}
