import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { getListingOfferSnapshotById } from '@test-utils/listing-offer/get-listing-offer-snapshot-by-id'

export async function findListingOfferById(id: string): Promise<ListingOffer | undefined> {
  const querySnapshot = await getListingOfferSnapshotById(id)
  return querySnapshot?.data()
}
