import { either, isEmpty, isNil } from 'ramda'

export function isNilOrEmpty<T = unknown>(
  value: T | null | undefined | [] | Record<string | number | symbol, never> | ''
): value is null | undefined | [] | Record<string | number | symbol, never> | '' {
  return either(isNil, isEmpty)(value)
}
