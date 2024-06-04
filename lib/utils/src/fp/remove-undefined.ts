import { always, isNil, when } from 'ramda'

export function removeUndefined<T>(value: T | undefined | null) {
  return when(isNil, always(null))(value) as T | null
}
