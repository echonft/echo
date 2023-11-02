import { assoc, dissoc, identity, isNil, lens, over, pipe, prop } from 'ramda'

function internalFn<K extends keyof T, T, U extends PropertyKey>(
  propKey: K,
  newPropKey: U
): (obj: T) => Omit<T, K> & Record<U, T[K]> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(over(lens(prop(propKey), pipe(assoc(newPropKey))), identity), dissoc(propKey))
}

export function modifyPropName<K extends keyof T, T, U extends PropertyKey>(
  propKey: K,
  newPropKey: U,
  obj: T
): Omit<T, K> & Record<U, T[K]>
export function modifyPropName<K extends keyof T, T, U extends PropertyKey>(
  propKey: K,
  newPropKey: U
): (obj: T) => Omit<T, K> & Record<U, T[K]>
export function modifyPropName<K extends keyof T, T, U extends PropertyKey>(
  propKey: K,
  newPropKey: U,
  obj?: T
): (Omit<T, K> & Record<U, T[K]>) | ((obj: T) => Omit<T, K> & Record<U, T[K]>) {
  if (isNil(obj)) {
    return internalFn<K, T, U>(propKey, newPropKey)
  }
  return internalFn<K, T, U>(propKey, newPropKey)(obj)
}
