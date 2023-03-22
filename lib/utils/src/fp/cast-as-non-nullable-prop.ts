import { identity } from 'ramda'

export const castAsNonNullableProp =
  <T, K extends keyof T, V = T[K]>(_prop: K) =>
  (value: T) =>
    identity(value) as unknown as Omit<T, K> & Record<K, NonNullable<V>>
