import { getListingSnapshotById } from './get-listing-snapshot-by-id'

export async function findListingById(id: string) {
  const documentSnapshot = await getListingSnapshotById(id)
  return documentSnapshot?.data()
}
