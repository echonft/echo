import { propIsNil } from './prop-is-nil'
import { dissoc, has, ifElse, modify, when } from 'ramda'
import { getAddress } from 'viem'

export const modifyStringPropToAddress = <K extends keyof T, T>(propKey: K) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  when(has(propKey), ifElse(propIsNil(propKey), dissoc(propKey), modify(propKey, getAddress))) as (
    obj: T
  ) => T & Record<K, string | undefined>
