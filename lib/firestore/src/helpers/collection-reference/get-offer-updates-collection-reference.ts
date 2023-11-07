import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import { CollectionReference } from 'firebase-admin/firestore'

export function getOfferUpdatesCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.OFFER_UPDATES) as CollectionReference<OfferUpdate>
}
