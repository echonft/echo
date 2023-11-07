import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type ListingPost } from '@echo/firestore/types/model/listing-post/listing-post'
import { CollectionReference } from 'firebase-admin/firestore'

export function getListingPostsCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.LISTING_POSTS) as CollectionReference<ListingPost>
}
