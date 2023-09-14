import { either, isEmpty, isNil } from 'ramda'

export function isNilOrEmpty<T = unknown>(
  value: T | null | undefined | [] | Record<string, never> | ''
): value is null | undefined | [] | Record<string, never> | '' {
  return either(isNil, isEmpty)(value)
}
