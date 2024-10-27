import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { isNil, pipe, prop } from 'ramda'

function innerPropIsNilOrEmpty<V, P extends keyof V>(propKey: P) {
  return function (obj: V) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(prop(propKey), isNilOrEmpty)(obj)
  }
}

export function propIsNilOrEmpty<V, P extends keyof V>(propKey: P, obj: V): boolean
export function propIsNilOrEmpty<P extends PropertyKey>(propKey: P): <V>(obj: V) => boolean
export function propIsNilOrEmpty<V, P extends keyof V>(propKey: P, obj?: V): boolean | ((obj: V) => boolean) {
  if (isNil(obj)) {
    return innerPropIsNilOrEmpty<V, P>(propKey)
  }
  return innerPropIsNilOrEmpty<V, P>(propKey)(obj)
}
