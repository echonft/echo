import { getCollectionSnapshotBySlug } from '@echo/firestore/crud/collection/get-collection-snapshot-by-slug'

export async function findCollectionBySlug(slug: string) {
  const documentSnapshot = await getCollectionSnapshotBySlug(slug)
  return documentSnapshot?.data()
}
