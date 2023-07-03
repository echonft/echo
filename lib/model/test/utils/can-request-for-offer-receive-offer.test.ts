import { requestsForOffer } from '../../src/mocks/request-for-offer'
import { RequestForOfferState } from '../../src/types/request-for-offer-state'
import { canRequestForOfferReceiveOffers } from '../../src/utils/request-for-offer/can-request-for-offer-receive-offers'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('utils - request-for-offer - canRequestForOfferReceiveOffer', () => {
  const requestForOffer = { ...requestsForOffer['jUzMtPGKM62mMhEcmbN4']!, expiresAt: dayjs().add(1, 'hour') }
  it('if expired, returns false', () => {
    expect(canRequestForOfferReceiveOffers(dayjs().subtract(1, 'hour'), requestForOffer.state)).toBeFalsy()
  })
  it('if not in created, offer received or partially fulfilled, returns false', () => {
    expect(canRequestForOfferReceiveOffers(requestForOffer.expiresAt, RequestForOfferState.CANCELLED)).toBeFalsy()
    expect(canRequestForOfferReceiveOffers(requestForOffer.expiresAt, RequestForOfferState.EXPIRED)).toBeFalsy()
    expect(canRequestForOfferReceiveOffers(requestForOffer.expiresAt, RequestForOfferState.FULFILLED)).toBeFalsy()
  })
  it('if request for offer is in proper state, returns true', () => {
    expect(canRequestForOfferReceiveOffers(requestForOffer.expiresAt, RequestForOfferState.CREATED)).toBeTruthy()
    expect(canRequestForOfferReceiveOffers(requestForOffer.expiresAt, RequestForOfferState.OFFER_RECEIVED)).toBeTruthy()
    expect(
      canRequestForOfferReceiveOffers(requestForOffer.expiresAt, RequestForOfferState.PARTIALLY_FULFILLED)
    ).toBeTruthy()
  })
})
