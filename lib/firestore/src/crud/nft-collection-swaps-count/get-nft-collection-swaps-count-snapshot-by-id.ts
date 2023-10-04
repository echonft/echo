import { getNftCollectionSwapsCountCollection } from '@echo/firestore/helpers/collection/get-nft-collection-swaps-count-collection'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getNftCollectionSwapsCountSnapshotById(id: string) {
  const querySnapshot = await getNftCollectionSwapsCountCollection().where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
