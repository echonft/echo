import { getNftsCollection } from '@echo/firestore/helpers/collection/get-nfts-collection'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'

export async function findNftByCollectionContract(
  collectionContractAddress: string,
  collectionContractChainId: number,
  tokenId: number
) {
  const querySnapshot = await getNftsCollection()
    .where('tokenId', '==', tokenId)
    .where('collection.contract.address', '==', collectionContractAddress)
    .where('collection.contract.chainId', '==', collectionContractChainId)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
