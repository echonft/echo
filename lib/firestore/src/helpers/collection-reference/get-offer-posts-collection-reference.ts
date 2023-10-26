import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type OfferPost } from '@echo/firestore/types/model/offer-post/offer-post'
import { type CollectionReference } from 'firebase-admin/firestore'

export function getOfferPostsCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.OFFER_POSTS) as CollectionReference<OfferPost>
}
