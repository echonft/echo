import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingPostDataConverter } from '@echo/firestore/converters/listing-post/listing-post-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export function getListingPostsCollection() {
  return firestoreApp().collection(CollectionName.LISTING_POSTS).withConverter(listingPostDataConverter)
}
