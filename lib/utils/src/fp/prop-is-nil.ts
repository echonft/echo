import { isNil, pipe, prop } from 'ramda'

export const propIsNil =
  <V, P extends string>(propKey: P) =>
  (obj: V) =>
    pipe(prop<V, P>(propKey), isNil)(obj)
