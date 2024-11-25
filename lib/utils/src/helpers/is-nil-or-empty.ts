import type { Nullable } from '@echo/utils/types/nullable'
import { either, isEmpty, isNil } from 'ramda'

export function isNilOrEmpty<T>(
  value: Nullable<T> | null | [] | Record<PropertyKey, never> | ''
): value is null | undefined | [] | Record<PropertyKey, never> | '' {
  return either(isNil, isEmpty)(value)
}
