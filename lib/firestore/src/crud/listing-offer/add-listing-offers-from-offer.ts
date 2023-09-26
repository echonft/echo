import { CollectionName } from '@echo/firestore/constants/collection-name'
import { getListingOffersByOfferId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-offer-id'
import { getListingOffersForOffer } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-offer'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreListingOffer } from '@echo/firestore/types/model/listing-offer/firestore-listing-offer'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { isIn } from '@echo/utils/fp/is-in'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { map, pipe, prop, reject } from 'ramda'

export async function addListingOffersFromOffer(offer: FirestoreOffer) {
  const listingOffers = await getListingOffersForOffer(offer)
  if (isNonEmptyArray(listingOffers)) {
    const existingListingOffers = await getListingOffersByOfferId(offer.id)
    const existingListingOffersListingIds = map(prop('listingId'), existingListingOffers)
    const newListingOffers = reject(pipe(prop('listingId'), isIn(existingListingOffersListingIds)), listingOffers)
    return Promise.all(
      map(async (newListingOffer) => {
        const reference = firestoreApp().collection(CollectionName.LISTING_OFFERS).doc()
        const document = { id: reference.id, ...newListingOffer }
        await reference.set(document)
        return document as FirestoreListingOffer
      }, newListingOffers)
    )
  }
  return [] as FirestoreListingOffer[]
}
