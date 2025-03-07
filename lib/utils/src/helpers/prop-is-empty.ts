import { isEmpty, isNil, pipe, prop } from 'ramda'

function innerPropIsEmpty<V, P extends keyof V>(propKey: P) {
  return function (obj: V) {
    return pipe(prop(propKey), isEmpty)(obj)
  }
}

export function propIsEmpty<V, P extends keyof V>(propKey: P, obj: V): boolean
export function propIsEmpty<V, P extends keyof V>(propKey: P): (obj: V) => boolean
export function propIsEmpty<V, P extends keyof V>(propKey: P, obj?: V): boolean | ((obj: V) => boolean) {
  if (isNil(obj)) {
    return innerPropIsEmpty<V, P>(propKey)
  }
  return innerPropIsEmpty<V, P>(propKey)(obj)
}
