import { pipe, Prop, prop } from 'rambda'

export const applyToProp = <P extends keyof S, S, T>(
  propToFind: P,
  fn: (sourceProp: Prop<S, P>) => T
): ((source: S) => T) => pipe(prop<P, S>(propToFind), fn) as (source: S) => T
