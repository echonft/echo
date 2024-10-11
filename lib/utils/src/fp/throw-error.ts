export function throwError<T>(error: string): (obj: T) => T {
  return function (_obj: T) {
    throw Error(error)
  } as (_obj: T) => T
}
