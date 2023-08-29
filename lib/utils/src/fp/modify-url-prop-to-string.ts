import { propIsNil } from './prop-is-nil'
import { dissoc, has, ifElse, modify, prop, when } from 'ramda'

export const modifyUrlPropToString = <K extends string, T>(propKey: K) =>
  when(has(propKey), ifElse(propIsNil(propKey), dissoc(propKey), modify(propKey, prop('href')))) as (
    obj: T
  ) => T | (T & Record<K, string>)
