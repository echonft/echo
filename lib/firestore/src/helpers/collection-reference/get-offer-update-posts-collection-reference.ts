import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { OfferUpdatePostDocumentData } from '@echo/firestore/types/model/offer-update-post/offer-update-post-document-data'
import { CollectionReference } from 'firebase-admin/firestore'

export function getOfferUpdatePostsCollectionReference(): CollectionReference<
  OfferUpdatePostDocumentData,
  OfferUpdatePostDocumentData
> {
  return firestoreApp().collection(CollectionReferenceName.OfferUpdatePosts) as CollectionReference<
    OfferUpdatePostDocumentData,
    OfferUpdatePostDocumentData
  >
}
