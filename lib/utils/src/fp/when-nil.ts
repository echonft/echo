import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, when } from 'ramda'

export function whenNil<T, U>(whenNil: (nullableObj: Nullable<T>) => U): (obj: Nullable<T>) => U {
  return when(isNil, whenNil) as (obj: Nullable<T>) => U
}
