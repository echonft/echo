import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { OfferSignature } from '@echo/model/types/offer-signature'
import { type CollectionReference } from 'firebase-admin/lib/firestore'

export function getOfferSignaturesCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.OFFER_SIGNATURES) as CollectionReference<OfferSignature>
}
