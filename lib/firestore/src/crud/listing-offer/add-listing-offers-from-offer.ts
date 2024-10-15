import { addListingOffer } from '@echo/firestore/crud/listing-offer/add-listing-offer'
import { getListingOffersByOffer } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-offer'
import { getListingOffersForOffer } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-offer'
import { type ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { type Offer } from '@echo/model/types/offer'
import { isIn } from '@echo/utils/fp/is-in'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { andThen, map, pipe, prop, propSatisfies, reject } from 'ramda'

export async function addListingOffersFromOffer(offer: Offer): Promise<NewDocument<ListingOfferDocumentData>[]> {
  const listingOffers = await getListingOffersForOffer(offer)
  if (isNonEmptyArray(listingOffers)) {
    const existingListingOffersListingIds = await pipe(
      prop('slug'),
      getListingOffersByOffer,
      andThen(map(prop('listingId')))
    )(offer)
    const newListingOffers = reject(propSatisfies(isIn(existingListingOffersListingIds), 'listingId'), listingOffers)
    const listingOffersNewDocuments = []
    for (const newListingOffer of newListingOffers) {
      const newDocument = await addListingOffer(newListingOffer)
      listingOffersNewDocuments.push(newDocument)
    }
    return listingOffersNewDocuments
  }
  return []
}
