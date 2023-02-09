import { PartialRecord } from '../types/partial-record'
import { notNilProp } from './not-nil-prop'
import { identity, ifElse, modify } from 'rambda'

/**
 * Ramda's modify with target type specified
 * @param prop
 * @param fn
 */
export const modifyTo: <K extends keyof C, A, B, C extends PartialRecord<K, A>, D extends PartialRecord<K, B>>(
  prop: K,
  fn: (a: A) => B
) => (target: C) => D = <K, A, B, C, D>(prop: K, fn: (a: A) => B) =>
  ifElse<C[], D, D>(
    notNilProp(prop as string),
    modify<string, A, B>(prop as string, fn) as unknown as (target: C) => D,
    identity as (...args: C[]) => D
  )
