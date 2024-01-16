import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { unless } from 'ramda'

export function unlessPropIsNil<K extends keyof T, T, U>(
  prop: K,
  whenFalseFn: (a: Omit<T, K> & Record<K, NonNullable<T[K]>>) => U
): (a: T) => (Omit<T, K> & Record<K, undefined>) | U {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return unless(propIsNil(prop), whenFalseFn)
}
