import { isNil, pipe, Prop, prop, unless } from 'rambda'

/**
 * Same as {@see applyToProp} but when the prop in the object is optional
 * and/or when the result can be null. In the case the prop is not found in the object,
 * the function is not executed and undefined is returned
 * @param propToFind
 * @param fn
 */
export const applyToNullableProp = <P extends keyof S, S, T>(
  propToFind: P,
  fn: (sourceProp: NonNullable<Prop<S, P>>) => T
): ((source: S | undefined) => T | undefined) =>
  pipe(
    prop<P, S>(propToFind),
    unless<Prop<S, P>, T>(isNil, (sourceProp: Prop<S, P>) => fn(sourceProp as NonNullable<Prop<S, P>>))
  ) as (source: S | undefined) => T | undefined
