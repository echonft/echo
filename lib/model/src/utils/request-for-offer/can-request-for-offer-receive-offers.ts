import { RequestForOffer } from '../../types/request-for-offer'
import { RequestForOfferState } from '../../types/request-for-offer-state'
import dayjs from 'dayjs'

export function canRequestForOfferReceiveOffers(requestForOffer: RequestForOffer) {
  if (requestForOffer.expiresAt < dayjs()) {
    return false
  }
  // TODO Should we allow offers on partially fulfilled?
  return (
    requestForOffer.state === RequestForOfferState.CREATED ||
    requestForOffer.state === RequestForOfferState.OFFER_RECEIVED ||
    requestForOffer.state === RequestForOfferState.PARTIALLY_FULFILLED
  )
}
