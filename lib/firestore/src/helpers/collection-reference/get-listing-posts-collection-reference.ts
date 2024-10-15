import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type ListingPostDocumentData } from '@echo/firestore/types/model/listing-post-document-data'
import { CollectionReference } from 'firebase-admin/firestore'

export function getListingPostsCollectionReference(): CollectionReference<
  ListingPostDocumentData,
  ListingPostDocumentData
> {
  return firestoreApp().collection(CollectionReferenceName.ListingPosts) as CollectionReference<
    ListingPostDocumentData,
    ListingPostDocumentData
  >
}
