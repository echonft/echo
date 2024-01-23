import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function nonEmptyReturn<Args extends unknown[], Return>(fn: (...args: Args) => Return[]) {
  return fn as (...args: Args) => NonEmptyArray<Return>
}
