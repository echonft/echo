import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { includes } from 'ramda'

export const isNotIn =
  <T>(list: T[] | NonEmptyArray<T>) =>
  (value: T) =>
    !includes(value, list)
