import { getNftCollectionsCollection } from '@echo/firestore/helpers/collection/get-nft-collections-collection'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getNftCollectionSnapshotById(id: string) {
  const querySnapshot = await getNftCollectionsCollection().where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
