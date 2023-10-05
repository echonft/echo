import { getNftCollectionsCollection } from '@echo/firestore/helpers/collection/get-nft-collections-collection'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getNftCollectionSnapshotBySlug(slug: string) {
  const querySnapshot = await getNftCollectionsCollection().where('slug', '==', slug).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
