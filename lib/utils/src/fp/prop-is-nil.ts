import { complement, either, has, isNil, pipe, prop } from 'ramda'

function internalFn<V, P extends keyof V>(propKey: P) {
  return function (obj: V): obj is V & { [P in keyof V]: null | undefined } {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return either(complement(has(propKey)), pipe(prop(propKey), isNil))(obj)
  }
}

export function propIsNil<V, P extends keyof V>(propKey: P, obj: V): obj is V & { [P in keyof V]: null | undefined }
export function propIsNil<V, P extends PropertyKey>(
  propKey: P
): (obj: V) => obj is V & { [P in keyof V]: null | undefined }
export function propIsNil<V, P extends keyof V>(propKey: P, obj?: V): boolean | ((obj: V) => boolean) {
  if (isNil(obj)) {
    return internalFn<V, P>(propKey)
  }
  return internalFn<V, P>(propKey)(obj)
}
