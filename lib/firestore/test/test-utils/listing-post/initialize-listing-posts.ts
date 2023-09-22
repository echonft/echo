import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { getAllListingPostMocks } from '@echo/firestore-mocks/listing-post/get-all-listing-post-mocks'

export async function initializeListingPosts() {
  const mocks = getAllListingPostMocks()
  for (const mock of mocks) {
    await firestoreApp().collection(CollectionName.LISTING_POSTS).doc(mock.id).set(mock)
  }
}
