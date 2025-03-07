import { complement, either, has, isNil, pipe, prop } from 'ramda'

function innerPropIsNil<V, P extends keyof V>(propKey: P) {
  return function (obj: V): obj is V & { [P in keyof V]: null | undefined } {
    return either(complement(has(propKey)), pipe(prop(propKey), isNil))(obj)
  }
}

export function propIsNil<V, P extends keyof V>(propKey: P, obj: V): obj is V & { [P in keyof V]: null | undefined }
export function propIsNil<V, P extends PropertyKey>(
  propKey: P
): (obj: V) => obj is V & { [P in keyof V]: null | undefined }
export function propIsNil<V, P extends keyof V>(propKey: P, obj?: V): boolean | ((obj: V) => boolean) {
  if (isNil(obj)) {
    return innerPropIsNil<V, P>(propKey)
  }
  return innerPropIsNil<V, P>(propKey)(obj)
}
