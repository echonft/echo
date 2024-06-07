import { isEmpty, type NonEmptyArray } from 'ramda'

/**
 * Function that asserts that an array is not empty
 * Useful for typing
 * @param {T[]} array
 * @return {array is NonEmptyArray<T>}
 */
export function isNonEmptyArray<T>(array: T[]): array is NonEmptyArray<T> {
  return !isEmpty(array)
}
