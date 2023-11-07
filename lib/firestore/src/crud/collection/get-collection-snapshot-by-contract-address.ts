import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-snapshot'
import { formatAddress } from '@echo/utils/helpers/format-address'

export async function getCollectionSnapshotByContractAddress(address: string, chainId: number) {
  const querySnapshot = await getCollectionsCollectionReference()
    .where('contract.address', '==', formatAddress(address, chainId))
    .where('contract.chainId', '==', chainId)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
