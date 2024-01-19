export function nonNullableReturn<Args extends unknown[], Return>(fn: (...args: Args) => Return | undefined) {
  return fn as (...args: Args) => Return
}
