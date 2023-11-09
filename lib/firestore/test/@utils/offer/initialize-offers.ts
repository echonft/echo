import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { offerDocumentDataMock } from '@echo/firestore-mocks/offer/offer-document-data-mock'

export async function initializeOffers() {
  const offers = Object.values(offerDocumentDataMock)
  for (const offer of offers) {
    await firestoreApp().collection(CollectionReferenceName.OFFERS).doc(offer.id).set(offer)
  }
}
