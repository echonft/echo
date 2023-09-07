import { getOfferSnapshotById } from './get-offer-snapshot-by-id'

export async function findOfferById(id: string) {
  const documentSnapshot = await getOfferSnapshotById(id)
  return documentSnapshot?.data()
}
