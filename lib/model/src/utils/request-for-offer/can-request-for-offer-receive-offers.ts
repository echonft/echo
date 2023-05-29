import { RequestForOfferState } from '../../types/request-for-offer-state'
import dayjs, { Dayjs } from 'dayjs'

export function canRequestForOfferReceiveOffers(expiresAt: Dayjs, state: RequestForOfferState) {
  if (expiresAt < dayjs()) {
    return false
  }
  // TODO Should we allow offers on partially fulfilled?
  return (
    state === RequestForOfferState.CREATED ||
    state === RequestForOfferState.OFFER_RECEIVED ||
    state === RequestForOfferState.PARTIALLY_FULFILLED
  )
}
