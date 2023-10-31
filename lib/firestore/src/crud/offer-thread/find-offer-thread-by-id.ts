import { getOfferThreadSnapshotById } from '@echo/firestore/crud/offer-thread/get-offer-thread-snapshot-by-id'

export async function findOfferThreadById(id: string) {
  const documentSnapshot = await getOfferThreadSnapshotById(id)
  return documentSnapshot?.data()
}
