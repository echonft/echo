import { getCollectionSnapshotById } from '@echo/firestore/crud/collection/get-collection-snapshot-by-id'

export async function findCollectionById(id: string) {
  const documentSnapshot = await getCollectionSnapshotById(id)
  return documentSnapshot?.data()
}
