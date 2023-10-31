export function nonNullableReturn<T>(fn: (...args: unknown[]) => T | undefined) {
  return fn as (...args: unknown[]) => T
}
