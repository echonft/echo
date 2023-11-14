import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-snapshot'
import type { HexString } from '@echo/utils/types/hex-string'
import { toLower } from 'ramda'

export async function getCollectionSnapshotByContractAddress(address: Lowercase<HexString>, chainId: number) {
  const querySnapshot = await getCollectionsCollectionReference()
    .where('contract.address', '==', toLower(address))
    .where('contract.chainId', '==', chainId)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
