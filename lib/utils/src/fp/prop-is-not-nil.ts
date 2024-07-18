import { both, complement, has, isNil, pipe, prop } from 'ramda'

function internalFn<T, K extends keyof T>(propKey: K) {
  return function (obj: T): obj is T & { [P in keyof T]: NonNullable<T[P]> } {
    return both(has(propKey), pipe(prop(propKey), complement(isNil)))(obj)
  }
}

export function propIsNotNil<T, K extends keyof T>(propKey: K, obj: T): obj is T & { [P in keyof T]: NonNullable<T[P]> }
export function propIsNotNil<K extends PropertyKey>(
  propKey: K
): <T>(obj: T) => obj is T & { [P in keyof T]: NonNullable<T[P]> }
export function propIsNotNil<T, K extends keyof T>(
  propKey: K,
  obj?: T
): boolean | ((obj: T) => obj is T & { [P in keyof T]: NonNullable<T[P]> }) {
  if (isNil(obj)) {
    return internalFn<T, K>(propKey)
  }
  return internalFn<T, K>(propKey)(obj)
}
