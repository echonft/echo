import { applySpec as rambdaApplySpec, Prop } from 'rambda'

/**
 * Ramda's applySpec with typing of the input (1 parameter only) and output
 * @param spec
 */
export const applySpec = <I, O>(spec: { [K in keyof O]: (input: I) => Prop<O, K> }): ((input: I) => O) =>
  rambdaApplySpec(spec) as unknown as (input: I) => O
