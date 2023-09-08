import { NonEmptyArray } from '../types/non-empty-array'
import { includes } from 'ramda'

export function isIn<T>(list: T[] | NonEmptyArray<T>) {
  return function (value: T) {
    return includes(value, list)
  }
}
