import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread/offer-thread-document-data'
import { CollectionReference } from 'firebase-admin/firestore'

export function getOfferThreadsCollectionReference(): CollectionReference<
  OfferThreadDocumentData,
  OfferThreadDocumentData
> {
  return firestoreApp().collection(CollectionReferenceName.OfferThreads) as CollectionReference<
    OfferThreadDocumentData,
    OfferThreadDocumentData
  >
}
