import { assoc, dissoc, isNil, pipe, prop as ramdaProp } from 'ramda'

function innerRenameProp<K extends string | number>(prop: K, toName: string) {
  return function <T extends Record<K, unknown>>(obj: T): Omit<T, K> & Record<typeof toName, T[K]> {
    const value = ramdaProp(prop, obj)
    return pipe<[T], Omit<T, K>, Omit<T, K> & Record<typeof toName, T[K]>>(
      dissoc(prop),
      assoc(toName, value) as (obj: Omit<T, K>) => Omit<T, K> & Record<typeof toName, T[K]>
    )(obj)
  }
}

export function renameProp<K extends string | number>(
  prop: K,
  toName: string
): <T extends Record<K, unknown>>(obj: T) => Omit<T, K> & Record<typeof toName, T[K]>
export function renameProp<T extends Record<K, unknown>, K extends string | number>(
  prop: K,
  toName: string,
  obj: T
): Omit<T, K> & Record<typeof toName, T[K]>
export function renameProp<T extends Record<K, unknown>, K extends string | number>(
  prop: K,
  toName: string,
  obj?: T
):
  | (Omit<T, K> & Record<typeof toName, T[K]>)
  | (<T extends Record<K, unknown>>(obj: T) => Omit<T, K> & Record<typeof toName, T[K]>) {
  if (isNil(obj)) {
    return innerRenameProp<K>(prop, toName)
  }
  return innerRenameProp<K>(prop, toName)(obj)
}
