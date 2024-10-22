import type { Swap } from '@echo/model/types/swap/swap'
import { has, modifyPath, toLower } from 'ramda'

export function lowerSenderWalletAddressIfExists(modelObject: Partial<Swap>): Partial<Swap> {
  if (has('sender', modelObject)) {
    return modifyPath(['sender', 'wallet', 'address'], toLower, modelObject)
  }
  return modelObject
}
