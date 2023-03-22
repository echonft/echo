import { pipe, Prop, prop } from 'ramda'

/**
 * Retrieves a prop with a given key and applies the given function on it
 * @param propToModify
 * @param fn
 */
export const applyToProp = <P extends keyof S, S, T>(
  propToModify: P,
  fn: (sourceProp: Prop<S, P>) => T
): ((source: S) => T) => pipe(prop<Prop<S, P>>(propToModify), fn) as (source: S) => T
