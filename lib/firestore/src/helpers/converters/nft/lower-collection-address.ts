import type { Nft } from '@echo/model/types/nft'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { modifyPath, toLower } from 'ramda'

export function lowerCollectionAddress<T extends Nft | WithFieldValue<Nft>>(nft: T): T {
  return modifyPath(['collection', 'contract', 'address'], toLower, nft)
}
