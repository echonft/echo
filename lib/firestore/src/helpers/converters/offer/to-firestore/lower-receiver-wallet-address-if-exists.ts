import type { Offer } from '@echo/model/types/offer'
import { has, modifyPath, toLower } from 'ramda'

export function lowerReceiverWalletAddressIfExists(modelObject: Partial<Offer>): Partial<Offer> {
  if (has('receiver', modelObject)) {
    return modifyPath(['receiver', 'wallet', 'address'], toLower, modelObject)
  }
  return modelObject
}
