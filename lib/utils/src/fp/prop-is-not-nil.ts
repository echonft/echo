import { complement, isNil, pipe, prop } from 'ramda'

export const propIsNotNil =
  <V, P extends string>(propKey: P) =>
  (obj: V) =>
    pipe(prop<V, P>(propKey), complement(isNil))(obj)
