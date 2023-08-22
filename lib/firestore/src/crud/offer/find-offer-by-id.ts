import { getOfferSnapshotById } from './get-offer-snapshot-by-id'

export const findOfferById = async (id: string) => {
  const documentSnapshot = await getOfferSnapshotById(id)
  return documentSnapshot?.data()
}
