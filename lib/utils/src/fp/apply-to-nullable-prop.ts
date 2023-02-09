import { isNil, pipe, Prop, prop, unless } from 'rambda'

export const applyToNullableProp = <P extends keyof S, S, T>(
  propToFind: P,
  fn: (sourceProp: NonNullable<Prop<S, P>>) => T
): ((source: S | undefined) => T | undefined) =>
  pipe(
    prop<P, S>(propToFind),
    unless<Prop<S, P>, T>(isNil, (sourceProp: Prop<S, P>) => fn(sourceProp as NonNullable<Prop<S, P>>))
  ) as (source: S | undefined) => T | undefined
