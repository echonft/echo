import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { getAllOfferPostMocks } from '@echo/firestore-mocks/offer-post/get-all-offer-post-mocks'

export async function initializeOfferPosts() {
  const mocks = getAllOfferPostMocks()
  for (const mock of mocks) {
    await firestoreApp().collection(CollectionName.OFFER_POSTS).doc(mock.id).set(mock)
  }
}
