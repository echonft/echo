import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { getAllListingOfferMocks } from '@echo/firestore-mocks/listing-offer/get-all-listing-offer-mocks'

export async function initializeListingOffers() {
  const mocks = getAllListingOfferMocks()
  for (const mock of mocks) {
    await firestoreApp().collection(CollectionReferenceName.LISTING_OFFERS).doc(mock.id).set(mock)
  }
}
