import { FirestoreOfferState } from '../../types/model/data/offer/firestore-offer-state'
import { FirestoreRequestForOfferState } from '../../types/model/data/request-for-offer/firestore-request-for-offer-state'

export function generateRequestForOfferStateFromOfferState(
  offerState: FirestoreOfferState
): FirestoreRequestForOfferState {
  switch (offerState) {
    case 'EXPIRED':
    case 'OPEN':
    case 'REJECTED':
    case 'CANCELLED':
      return 'OFFER_RECEIVED'
    case 'ACCEPTED':
      return 'PARTIALLY_FULFILLED'
    case 'COMPLETED':
      return 'FULFILLED'
  }
}
