import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingPostDataConverter } from '@echo/firestore/converters/listing-post/listing-post-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreListingPost } from '@echo/firestore/types/model/listing-post/firestore-listing-post'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { invoker, map } from 'ramda'

export async function getAllListingPosts() {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.LISTING_POSTS)
    .withConverter(listingPostDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as FirestoreListingPost[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreListingPost[]
}
