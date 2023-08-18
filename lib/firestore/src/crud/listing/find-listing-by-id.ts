import { getListingSnapshotById } from './get-listing-snapshot-by-id'

export const findListingById = async (id: string) => {
  const documentSnapshot = await getListingSnapshotById(id)
  return documentSnapshot.data()
}
