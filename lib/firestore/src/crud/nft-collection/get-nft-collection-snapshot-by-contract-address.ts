import { getNftCollectionsCollection } from '@echo/firestore/helpers/collection/get-nft-collections-collection'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getNftCollectionSnapshotByContractAddress(address: string, chainId: number) {
  const querySnapshot = await getNftCollectionsCollection()
    .where('contract.address', '==', address)
    .where('contract.chainId', '==', chainId)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
