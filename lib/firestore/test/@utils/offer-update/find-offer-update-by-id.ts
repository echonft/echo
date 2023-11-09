import { getOfferUpdateSnapshotById } from '@echo/firestore-test/offer-update/get-offer-update-snapshot-by-id'

export async function findOfferUpdateById(id: string) {
  const documentSnapshot = await getOfferUpdateSnapshotById(id)
  return documentSnapshot?.data()
}
