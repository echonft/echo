import { getNftCollectionSwapsCountCollection } from '@echo/firestore/helpers/collection/get-nft-collection-swaps-count-collection'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getNftCollectionSwapsCountSnapshotByCollectionId(collectionId: string) {
  const querySnapshot = await getNftCollectionSwapsCountCollection().where('collectionId', '==', collectionId).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
