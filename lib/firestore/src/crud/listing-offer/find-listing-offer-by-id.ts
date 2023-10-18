import { getListingOfferSnapshotById } from '@echo/firestore/crud/listing-offer/get-listing-offer-snapshot-by-id'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'

export async function findListingOfferById(id: string): Promise<ListingOffer | undefined> {
  const querySnapshot = await getListingOfferSnapshotById(id)
  return querySnapshot?.data()
}
