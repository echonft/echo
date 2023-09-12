import { either, isEmpty, isNil } from 'ramda'

export function isNilOrEmpty<T = unknown>(value: T): boolean {
  return either(isNil, isEmpty)(value)
}
