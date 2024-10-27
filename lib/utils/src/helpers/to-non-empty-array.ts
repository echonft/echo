import { type NonEmptyArray } from 'ramda'

export function toNonEmptyArray<T>(list: T[]): NonEmptyArray<T> {
  return list as NonEmptyArray<T>
}
