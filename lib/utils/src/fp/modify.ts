import { notNilProp } from './not-nil-prop'
import { identity, ifElse, modify as rambdaModify } from 'rambda'

/**
 * Better typings for ramda's modify
 * @param prop
 * @param fn
 */
export const modify: <K extends keyof C, A, B, C extends Record<K, A | undefined>>(
  prop: K,
  fn: (a: A) => B
) => (target: C) => C | (Omit<C, K> & Record<K, B | undefined>) = <K extends keyof C, A, B, C>(
  prop: K,
  fn: (a: A) => B
) =>
  ifElse<C[], Omit<C, K> & Record<K, B | undefined>, C>(
    notNilProp(prop as string),
    rambdaModify<string, A, B>(prop as string, fn) as unknown as (target: C) => Omit<C, K> & Record<K, B | undefined>,
    identity<C>
  )
