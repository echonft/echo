import { getListingOfferSnapshotById } from '@echo/firestore/crud/listing-offer/get-listing-offer-snapshot-by-id'
import type { FirestoreListingOffer } from '@echo/firestore/types/model/listing-offer/firestore-listing-offer'

export async function findListingOfferById(id: string): Promise<FirestoreListingOffer | undefined> {
  const querySnapshot = await getListingOfferSnapshotById(id)
  return querySnapshot?.data()
}
