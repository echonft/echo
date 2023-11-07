import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-data'
import { formatAddress } from '@echo/utils/helpers/format-address'

export async function findNftByCollectionContract(
  collectionContractAddress: string,
  collectionContractChainId: number,
  tokenId: number
) {
  const querySnapshot = await getNftsCollectionReference()
    .where('tokenId', '==', tokenId)
    .where('collection.contract.address', '==', formatAddress(collectionContractAddress, collectionContractChainId))
    .where('collection.contract.chainId', '==', collectionContractChainId)
    .get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
