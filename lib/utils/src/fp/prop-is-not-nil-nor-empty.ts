import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { complement, isNil, pipe, prop } from 'ramda'

function internalFn<V, P extends keyof V>(propKey: P) {
  return function (obj: V) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(prop(propKey), complement(isNilOrEmpty))(obj)
  }
}

export function propIsNotNilNorEmpty<V, P extends keyof V>(propKey: P, obj: V): boolean
export function propIsNotNilNorEmpty<P extends PropertyKey>(propKey: P): <V>(obj: V) => boolean
export function propIsNotNilNorEmpty<V, P extends keyof V>(propKey: P, obj?: V): boolean | ((obj: V) => boolean) {
  if (isNil(obj)) {
    return internalFn<V, P>(propKey)
  }
  return internalFn<V, P>(propKey)(obj)
}
