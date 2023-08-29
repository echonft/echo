import { assoc, has, unless } from 'ramda'

export const assocUndefinedIfPropNotPresent = <K extends string, T>(propKey: K) =>
  unless(has(propKey), assoc(propKey, undefined)) as (obj: T) => T & Record<K, undefined>
