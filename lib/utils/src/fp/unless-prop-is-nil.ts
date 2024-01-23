import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { unless } from 'ramda'

export function unlessPropIsNil<K extends keyof T, T, U>(
  prop: K,
  whenFalseFn: (a: Omit<T, K> & Record<K, NonNullable<T[K]>>) => U
) {
  return unless(propIsNil(prop), whenFalseFn) as (a: T) => (Omit<T, K> & Record<K, undefined>) | U
}
