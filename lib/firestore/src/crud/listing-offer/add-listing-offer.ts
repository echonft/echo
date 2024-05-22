import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import { getListingOfferSnapshot } from '@echo/firestore/crud/listing-offer/get-listing-offer'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { LISTING_STATE_OFFERS_PENDING, LISTING_STATE_OPEN } from '@echo/model/constants/listing-states'
import { isNil, omit } from 'ramda'

export async function addListingOffer(listingOffer: ListingOffer): Promise<NewDocument<ListingOffer>> {
  const { listingId, offerId } = listingOffer
  const listing = await getListingById(listingId)
  if (isNil(listing)) {
    throw Error(`trying to add a listing offer for listing id ${listingId} but this listing does not exist`)
  }
  const offer = await getOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`trying to add a listing offer for offer id ${offerId} but this offer does not exist`)
  }
  const snapshot = await getListingOfferSnapshot(omit(['fulfillingStatus'], listingOffer))
  if (!isNil(snapshot)) {
    throw Error(
      `trying to add a listing offer for listing id ${listingId} and offer id ${offerId} but this listing offer already exists`
    )
  }
  const id = await setReference<ListingOffer>({
    collectionReference: getListingOffersCollectionReference(),
    data: listingOffer
  })
  // update listing state if needed
  if (listing.state === LISTING_STATE_OPEN) {
    await updateListingState(listingId, LISTING_STATE_OFFERS_PENDING)
  }
  return { id, data: listingOffer }
}
