import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { OfferUpdateDocumentData } from '@echo/firestore/types/model/offer-update/offer-update-document-data'
import { CollectionReference } from 'firebase-admin/firestore'

export function getOfferUpdatesCollectionReference<
  T extends OfferUpdateDocumentData = OfferUpdateDocumentData
>(): CollectionReference<T, T> {
  return firestoreApp().collection(CollectionReferenceName.OfferUpdates) as CollectionReference<T, T>
}
