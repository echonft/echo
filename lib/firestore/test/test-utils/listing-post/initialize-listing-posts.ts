import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { listingPostMock } from '@echo/firestore-mocks/listing-post/listing-post-mock'

export async function initializeListingPosts() {
  const mocks = Object.values(listingPostMock)
  for (const mock of mocks) {
    await firestoreApp().collection(CollectionReferenceName.LISTING_POSTS).doc(mock.id).set(mock)
  }
}
