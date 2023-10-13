import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { getAddress } from 'viem'

export async function findNftByCollectionContract(
  collectionContractAddress: string,
  collectionContractChainId: number,
  tokenId: number
) {
  const querySnapshot = await getNftsCollectionReference()
    .where('tokenId', '==', tokenId)
    .where('collection.contract.address', '==', getAddress(collectionContractAddress, collectionContractChainId))
    .where('collection.contract.chainId', '==', collectionContractChainId)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
