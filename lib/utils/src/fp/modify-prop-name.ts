import { propIsNil } from '@echo-utils/fp/prop-is-nil'
import { assoc, dissoc, has, identity, isNil, lens, over, pipe, prop, unless, when } from 'ramda'

function internalFn<K extends keyof T, T>(
  propKey: K,
  newPropKey: string
): (obj: T) => (T & Omit<T, K>) | (T & Omit<T, K> & Record<K, T[K]>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return when(
    has(propKey),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pipe(
      unless(
        propIsNil(propKey),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        over(lens(prop(propKey), pipe(assoc(newPropKey))), identity)
      ),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dissoc(propKey)
    )
  )
}

export function modifyPropName<K extends keyof T, T>(
  propKey: K,
  newPropKey: string,
  obj: T
): (T & Omit<T, K>) | (T & Omit<T, K> & Record<K, T[K]>)
export function modifyPropName<K extends keyof T, T>(
  propKey: K,
  newPropKey: string
): (obj: T) => (T & Omit<T, K>) | (T & Omit<T, K> & Record<K, T[K]>)
export function modifyPropName<K extends keyof T, T>(
  propKey: K,
  newPropKey: string,
  obj?: T
):
  | ((T & Omit<T, K>) | (T & Omit<T, K> & Record<K, T[K]>))
  | ((obj: T) => (T & Omit<T, K>) | (T & Omit<T, K> & Record<K, T[K]>)) {
  if (isNil(obj)) {
    return internalFn<K, T>(propKey, newPropKey)
  }
  return internalFn<K, T>(propKey, newPropKey)(obj)
}
