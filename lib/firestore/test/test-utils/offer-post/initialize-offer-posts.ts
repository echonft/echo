import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { offerPostMock } from '@echo/firestore-mocks/offer-post/offer-post-mock'

export async function initializeOfferPosts() {
  const mocks = Object.values(offerPostMock)
  for (const mock of mocks) {
    await firestoreApp().collection(CollectionReferenceName.OFFER_POSTS).doc(mock.id).set(mock)
  }
}
