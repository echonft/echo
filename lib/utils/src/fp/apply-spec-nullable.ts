import { applySpec, isNil, Prop, unless } from 'rambda'

/**
 * Ramda's applySpec with typing of the input (1 parameter only) and output
 * @param spec
 */
export const applySpecNullable = <I, O>(spec: { [K in keyof O]: (input: I) => Prop<O, K> }): ((
  input: I | undefined
) => O | undefined) =>
  unless(isNil, applySpec(spec) as unknown as (input: I) => O) as unknown as (input: I | undefined) => O | undefined
