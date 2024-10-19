import type { Listing } from '@echo/model/types/listing/listing'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { has, modifyPath, toLower } from 'ramda'

export function lowerCreatorWalletAddressIfExists(modelObject: WithFieldValue<Listing>): WithFieldValue<Listing> {
  if (has('creator', modelObject)) {
    return modifyPath(['creator', 'wallet', 'address'], toLower, modelObject)
  }
  return modelObject
}
