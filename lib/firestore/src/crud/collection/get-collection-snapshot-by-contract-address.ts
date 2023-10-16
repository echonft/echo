import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { getAddress } from 'viem'

export async function getCollectionSnapshotByContractAddress(address: string, chainId: number) {
  const querySnapshot = await getCollectionsCollectionReference()
    .where('contract.address', '==', getAddress(address, chainId))
    .where('contract.chainId', '==', chainId)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
