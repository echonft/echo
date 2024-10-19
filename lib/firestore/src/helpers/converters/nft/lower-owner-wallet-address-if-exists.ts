import type { EscrowedNftDocumentData } from '@echo/firestore/types/model/escrowed-nft-document-data'
import type { NftDocumentData } from '@echo/firestore/types/model/nft-document-data'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { has, modifyPath, toLower } from 'ramda'

export function lowerOwnerWalletAddressIfExists<
  T extends WithFieldValue<NftDocumentData> | WithFieldValue<EscrowedNftDocumentData>
>(modelObject: T): T {
  if (has('owner', modelObject)) {
    return modifyPath(['owner', 'wallet', 'address'], toLower, modelObject)
  }
  return modelObject
}
