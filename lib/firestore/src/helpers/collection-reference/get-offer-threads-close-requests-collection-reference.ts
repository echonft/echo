import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { OfferThreadCloseRequest } from '@echo/firestore/types/model/offer-thread-close-request/offer-thread-close-request'
import { CollectionReference } from 'firebase-admin/firestore'

export function getOfferThreadsCloseRequestsCollectionReference(): CollectionReference<OfferThreadCloseRequest> {
  return firestoreApp().collection(
    CollectionReferenceName.OFFER_THREADS_CLOSE_REQUEST
  ) as CollectionReference<OfferThreadCloseRequest>
}
