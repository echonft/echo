import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { listingPostDocumentDataMock } from '@echo/firestore-mocks/listing-post/listing-post-document-data-mock'

export async function initializeListingPosts() {
  const mocks = Object.values(listingPostDocumentDataMock)
  for (const mock of mocks) {
    await firestoreApp().collection(CollectionName.LISTING_POSTS).doc(mock.id).set(mock)
  }
}
