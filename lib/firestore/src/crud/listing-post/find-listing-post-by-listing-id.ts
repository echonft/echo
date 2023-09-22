import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingPostDataConverter } from '@echo/firestore/converters/listing-post/listing-post-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreListingPost } from '@echo/firestore/types/model/listing-post/firestore-listing-post'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function findListingPostByListingId(listingId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.LISTING_POSTS)
    .withConverter(listingPostDataConverter)
    .where('listingId', '==', listingId)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  return (head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreListingPost>).data()
}
