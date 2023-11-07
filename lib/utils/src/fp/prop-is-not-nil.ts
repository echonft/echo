import { both, complement, has, isNil, pipe, prop } from 'ramda'

function internalFn<T, K extends keyof T>(propKey: K) {
  return function (obj: T) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return both(has(propKey), pipe(prop(propKey), complement(isNil)))(obj)
  }
}

export function propIsNotNil<T, K extends keyof T>(propKey: K, obj: T): boolean
export function propIsNotNil<K extends PropertyKey>(propKey: K): <T>(obj: T) => boolean
export function propIsNotNil<T, K extends keyof T>(propKey: K, obj?: T): boolean | ((obj: T) => boolean) {
  if (isNil(obj)) {
    return internalFn<T, K>(propKey)
  }
  return internalFn<T, K>(propKey)(obj)
}
