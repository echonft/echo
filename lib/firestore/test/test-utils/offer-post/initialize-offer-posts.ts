import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { offerPostDocumentDataMock } from '@echo/firestore-mocks/offer-post/offer-post-document-data-mock'

export async function initializeOfferPosts() {
  const mocks = Object.values(offerPostDocumentDataMock)
  for (const mock of mocks) {
    await firestoreApp().collection(CollectionName.OFFER_POSTS).doc(mock.id).set(mock)
  }
}
