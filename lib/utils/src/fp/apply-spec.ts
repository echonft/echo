import { applySpec as rambdaApplySpec, Prop } from 'rambda'

/**
 * Ramda's applySpec with typing of the input and output, with the only difference that
 * it does NOT work with nested objects in the spec
 * @param spec
 */
export const applySpec = <I, O>(spec: { [K in keyof O]: (input: I) => Prop<O, K> }): ((input: I) => O) =>
  rambdaApplySpec(spec) as unknown as (input: I) => O
