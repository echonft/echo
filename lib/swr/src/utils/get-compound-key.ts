import { SwrKeys } from '../types'

export function getCompoundKey(key: SwrKeys, ...args: string[]): string {
  return args.reduce((previousValue, currentValue) => `${previousValue}/${currentValue}`, key)
}
