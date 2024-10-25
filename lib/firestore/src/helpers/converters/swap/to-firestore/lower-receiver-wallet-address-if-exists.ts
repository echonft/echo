import type { Swap } from '@echo/model/types/swap'
import { has, modifyPath, toLower } from 'ramda'

export function lowerReceiverWalletAddressIfExists(modelObject: Partial<Swap>): Partial<Swap> {
  if (has('receiver', modelObject)) {
    return modifyPath(['receiver', 'wallet', 'address'], toLower, modelObject)
  }
  return modelObject
}
