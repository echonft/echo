import { is } from 'ramda'

export function throwError<Args extends unknown[], Result = Args>(
  error: string | ((...args: Args) => Error)
): (...args: Args) => Result {
  return function (...args: Args) {
    if (is(String, error)) {
      throw Error(error)
    }
    throw error(...args)
  } as (...args: Args) => Result
}
