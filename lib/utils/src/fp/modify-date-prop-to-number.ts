import { propIsNil } from './prop-is-nil'
import { dissoc, has, ifElse, invoker, modify, when } from 'ramda'

export const modifyDatePropToNumber = <K extends string, T>(propKey: K) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  when(has(propKey), ifElse(propIsNil(propKey), dissoc(propKey), modify(propKey, invoker(0, 'unix')))) as (
    obj: T
  ) => T | (T & Record<K, number>)
