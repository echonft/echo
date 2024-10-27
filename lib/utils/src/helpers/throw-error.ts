export function throwError<T>(error: string): (obj: unknown) => T {
  return function (_obj: unknown) {
    throw Error(error)
  } as (_obj: unknown) => T
}
