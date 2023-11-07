import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { CollectionReference } from 'firebase-admin/firestore'

export function getOfferThreadsCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.OFFER_THREADS) as CollectionReference<OfferThread>
}
