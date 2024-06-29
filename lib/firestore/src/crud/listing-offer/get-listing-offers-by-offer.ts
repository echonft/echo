import { getListingOffersByOfferId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-offer-id'
import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { isNil } from 'ramda'

export async function getListingOffersByOffer(slug: string): Promise<ListingOffer[]> {
  const snapshot = await getOfferSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(`offer with slug ${slug} does not exist`))
  }
  return getListingOffersByOfferId(snapshot.id)
}
