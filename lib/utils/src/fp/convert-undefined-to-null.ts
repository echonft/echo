import { always, isNil, when } from 'ramda'

export function convertUndefinedToNull<T>(value: T | undefined | null) {
  return when(isNil, always(null))(value) as T | null
}
