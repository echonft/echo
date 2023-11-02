import { either, isEmpty, isNil } from 'ramda'

export function isNilOrEmpty<T = unknown>(
  value: T | null | undefined | [] | Record<PropertyKey, never> | ''
): value is null | undefined | [] | Record<PropertyKey, never> | '' {
  return either(isNil, isEmpty)(value)
}
