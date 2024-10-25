import type { Offer } from '@echo/model/types/offer'
import { has, modifyPath, toLower } from 'ramda'

export function lowerSenderWalletAddressIfExists(modelObject: Partial<Offer>): Partial<Offer> {
  if (has('sender', modelObject)) {
    return modifyPath(['sender', 'wallet', 'address'], toLower, modelObject)
  }
  return modelObject
}
