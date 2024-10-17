import { getListingOfferSnapshot } from '@echo/firestore/crud/listing-offer/get-listing-offer'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { ListingState } from '@echo/model/constants/listing-state'
import { isNil, omit } from 'ramda'

export async function addListingOffer(
  listingOffer: ListingOfferDocumentData
): Promise<NewDocument<ListingOfferDocumentData>> {
  const { listingId, offerId } = listingOffer
  const listing = await getListingById(listingId)
  if (isNil(listing)) {
    return Promise.reject(
      Error(`trying to add a listing offer for listing id ${listingId} but this listing does not exist`)
    )
  }
  const offer = await getOfferById(offerId)
  if (isNil(offer)) {
    return Promise.reject(Error(`trying to add a listing offer for offer id ${offerId} but this offer does not exist`))
  }
  const snapshot = await getListingOfferSnapshot(omit(['fulfillingStatus'], listingOffer))
  if (!isNil(snapshot)) {
    return Promise.reject(
      Error(
        `trying to add a listing offer for listing id ${listingId} and offer id ${offerId} but this listing offer already exists`
      )
    )
  }
  const id = await setReference<ListingOfferDocumentData, ListingOfferDocumentData>({
    collectionReference: getListingOffersCollectionReference(),
    data: listingOffer
  })
  // update listing state if needed
  if (listing.state === ListingState.Open) {
    await updateListingState(listing.slug, ListingState.OffersPending)
  }
  return { id, data: listingOffer }
}
