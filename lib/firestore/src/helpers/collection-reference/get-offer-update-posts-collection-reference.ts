import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { OfferUpdatePost } from '@echo/firestore/types/model/offer-update-post/offer-update-post'
import { CollectionReference } from 'firebase-admin/firestore'

export function getOfferUpdatePostsCollectionReference(): CollectionReference<OfferUpdatePost, OfferUpdatePost> {
  return firestoreApp().collection(CollectionReferenceName.OFFER_UPDATE_POSTS) as CollectionReference<
    OfferUpdatePost,
    OfferUpdatePost
  >
}
