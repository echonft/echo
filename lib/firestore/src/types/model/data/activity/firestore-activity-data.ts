import { FirestoreDocumentData } from '../abstract/firestore-document-data'
import { FirestoreOfferState } from '../offer/firestore-offer-state'
import { FirestoreRequestForOfferState } from '../request-for-offer/firestore-request-for-offer-state'
import { FirestoreSwapState } from '../swap/firestore-swap-state'

export interface FirestoreActivityData extends FirestoreDocumentData {
  date: number
  fromState?: FirestoreOfferState | FirestoreRequestForOfferState | FirestoreSwapState
  toState: FirestoreOfferState | FirestoreRequestForOfferState | FirestoreSwapState
}
