import type { Nullable } from '@echo/utils/types/nullable'

export function nonNullableReturn<Args extends unknown[], Return>(fn: (...args: Args) => Nullable<Return>) {
  return fn as (...args: Args) => NonNullable<Return>
}
