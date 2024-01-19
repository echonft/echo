import { has, when } from 'ramda'

export function whenHas<K extends keyof T, T, U, V>(
  key: K,
  whenTrue: (obj: Omit<T, K> & Record<K, U>) => V
): (obj: T) => T | V {
  return when(has(key), whenTrue) as unknown as (obj: T) => T | V
}
