import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { isEmpty } from 'ramda'

function internalFn(current: boolean | undefined, rest: (boolean | undefined)[]): boolean {
  if (current) {
    return false
  }
  if (isEmpty(rest)) {
    return true
  }
  const [nextCurrent, ...nextRest] = rest as NonEmptyArray<boolean>
  return internalFn(nextCurrent, nextRest)
}
export function neither(...args: (boolean | undefined)[]): boolean {
  if (args.length === 1) {
    return !args[0]
  }
  const [current, ...rest] = args
  return internalFn(current, rest)
}
