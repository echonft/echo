import type { EscrowedNftDocumentData } from '@echo/firestore/types/model/nft/escrowed-nft-document-data'
import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { modifyPath, toLower } from 'ramda'

export function lowerOwnerWalletAddress<
  T extends
    | NftDocumentData
    | WithFieldValue<NftDocumentData>
    | EscrowedNftDocumentData
    | WithFieldValue<EscrowedNftDocumentData>
>(nft: T): T {
  if (propIsNil('owner', nft)) {
    return nft
  }
  return modifyPath(['owner', 'wallet', 'address'], toLower, nft)
}
