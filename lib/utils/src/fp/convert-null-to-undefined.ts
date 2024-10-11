import { always, isNil, when } from 'ramda'

export function convertNullToUndefined<T>(value: T | null) {
  return when(isNil, always(undefined))(value) as T | undefined
}
