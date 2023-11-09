import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { offerThreadMock } from '@echo/firestore-mocks/offer-thread/offer-thread-mock'

export async function initializeOfferThreads() {
  const mocks = Object.values(offerThreadMock)
  for (const mock of mocks) {
    await firestoreApp().collection(CollectionReferenceName.OFFER_THREADS).doc(mock.id).set(mock)
  }
}
