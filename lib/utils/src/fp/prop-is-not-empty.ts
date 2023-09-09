import { complement, isEmpty, isNil, pipe, prop } from 'ramda'

function internalFn<V, P extends keyof V>(propKey: P) {
  return function (obj: V) {
    return pipe(prop<V, P>(propKey), complement(isEmpty))(obj)
  }
}

export function propIsNotEmpty<V, P extends keyof V>(propKey: P, obj: V): boolean
export function propIsNotEmpty<P extends string | number | symbol>(propKey: P): <V>(obj: V) => boolean
export function propIsNotEmpty<V, P extends keyof V>(propKey: P, obj?: V): boolean | ((obj: V) => boolean) {
  if (isNil(obj)) {
    return internalFn<V, P>(propKey)
  }
  return internalFn<V, P>(propKey)(obj)
}
