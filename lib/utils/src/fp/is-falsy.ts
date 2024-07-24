import { equals } from 'ramda'

export function isFalsy(val: boolean) {
  return equals(false, val)
}
