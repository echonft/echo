import { getListingPostSnapshotById } from '@echo/firestore-test/listing-post/get-listing-post-snapshot-by-id'

export async function findListingPostById(id: string) {
  const documentSnapshot = await getListingPostSnapshotById(id)
  return documentSnapshot?.data()
}
