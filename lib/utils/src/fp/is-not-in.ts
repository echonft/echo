import { includes } from 'ramda'

export function isNotIn<T>(list: T[]) {
  return function (value: T) {
    return !includes(value, list)
  }
}
