import { getOfferUpdateSnapshotById } from '@echo/firestore/crud/offer-update/get-offer-update-snapshot-by-id'

// noinspection JSUnusedGlobalSymbols
export async function findOfferUpdateById(id: string) {
  const documentSnapshot = await getOfferUpdateSnapshotById(id)
  return documentSnapshot?.data()
}
