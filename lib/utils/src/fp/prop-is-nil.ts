import { isNil, pipe, prop } from 'ramda'

function internalFn<V, P extends keyof V>(propKey: P) {
  return function (obj: V) {
    return pipe(prop<V, P>(propKey), isNil)(obj)
  }
}

export function propIsNil<V, P extends keyof V>(propKey: P, obj: V): boolean
export function propIsNil<P extends string | number | symbol>(propKey: P): <V>(obj: V) => boolean
export function propIsNil<V, P extends keyof V>(propKey: P, obj?: V): boolean | ((obj: V) => boolean) {
  if (isNil(obj)) {
    return internalFn<V, P>(propKey)
  }
  return internalFn<V, P>(propKey)(obj)
}
