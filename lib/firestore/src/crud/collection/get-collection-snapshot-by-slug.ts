import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-snapshot'

export async function getCollectionSnapshotBySlug(slug: string) {
  const querySnapshot = await getCollectionsCollectionReference().where('slug', '==', slug).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
