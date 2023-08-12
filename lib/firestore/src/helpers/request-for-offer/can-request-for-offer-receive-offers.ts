import { FirestoreRequestForOfferState } from '../../types/model/data/request-for-offer/firestore-request-for-offer-state'
import dayjs, { Dayjs } from 'dayjs'

export function canRequestForOfferReceiveOffers(expiresAt: Dayjs, state: FirestoreRequestForOfferState) {
  if (expiresAt < dayjs()) {
    return false
  }
  // TODO Should we allow offers on partially fulfilled?
  return state === 'CREATED' || state === 'OFFER_RECEIVED' || state === 'PARTIALLY_FULFILLED'
}
