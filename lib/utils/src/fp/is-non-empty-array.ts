import type { Nullable } from '@echo/utils/types/nullable'
import { either, isEmpty, isNil, type NonEmptyArray } from 'ramda'

/**
 * Function that asserts that an array is not empty
 * Useful for typing
 * @param array
 * @return {array is NonEmptyArray}
 */
export function isNonEmptyArray<T>(array: Nullable<T[]>): array is NonEmptyArray<T> {
  return !either(isNil, isEmpty)(array)
}
