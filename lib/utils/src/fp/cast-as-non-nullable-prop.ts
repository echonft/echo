import { identity } from 'ramda'

export const castAsNonNullableProp =
  <T, K extends keyof T, V = T[K]>(_prop: K) =>
  (value: T) =>
    identity<T>(value) as unknown as Omit<V, K> & Record<K, NonNullable<V>>
