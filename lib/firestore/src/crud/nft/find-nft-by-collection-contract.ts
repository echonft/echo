import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-data'
import type { HexString } from '@echo/utils/types/hex-string'
import { toLower } from 'ramda'

export async function findNftByCollectionContract(
  collectionContractAddress: Lowercase<HexString>,
  collectionContractChainId: number,
  tokenId: number
) {
  const querySnapshot = await getNftsCollectionReference()
    .where('tokenId', '==', tokenId)
    .where('collection.contract.address', '==', toLower(collectionContractAddress))
    .where('collection.contract.chainId', '==', collectionContractChainId)
    .get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
