import { getNftsCollection } from '@echo/firestore/helpers/collection/get-nfts-collection'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { getAddress } from 'viem'

export async function findNftByCollectionContract(
  collectionContractAddress: string,
  collectionContractChainId: number,
  tokenId: number
) {
  const querySnapshot = await getNftsCollection()
    .where('tokenId', '==', tokenId)
    .where('collection.contract.address', '==', getAddress(collectionContractAddress, collectionContractChainId))
    .where('collection.contract.chainId', '==', collectionContractChainId)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
