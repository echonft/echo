import { requestsForOffer } from '../../../mocks/request-for-offer'
import { RequestForOfferState } from '../../../types/request-for-offer-state'
import { canRequestForOfferReceiveOffers } from '../can-request-for-offer-receive-offers'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('utils - request-for-offer - canRequestForOfferReceiveOffer', () => {
  const requestForOffer = { ...requestsForOffer['jUzMtPGKM62mMhEcmbN4']!, expiresAt: dayjs().add(1, 'hour') }
  it('if expired, returns false', () => {
    expect(canRequestForOfferReceiveOffers({ ...requestForOffer, expiresAt: dayjs().subtract(1, 'hour') })).toBeFalsy()
  })
  it('if not in created, offer received or partially fulfilled, returns false', () => {
    expect(canRequestForOfferReceiveOffers({ ...requestForOffer, state: RequestForOfferState.CANCELLED })).toBeFalsy()
    expect(canRequestForOfferReceiveOffers({ ...requestForOffer, state: RequestForOfferState.EXPIRED })).toBeFalsy()
    expect(canRequestForOfferReceiveOffers({ ...requestForOffer, state: RequestForOfferState.FULFILLED })).toBeFalsy()
  })
  it('if request for offer is in proper state, returns true', () => {
    expect(canRequestForOfferReceiveOffers({ ...requestForOffer, state: RequestForOfferState.CREATED })).toBeTruthy()
    expect(
      canRequestForOfferReceiveOffers({ ...requestForOffer, state: RequestForOfferState.OFFER_RECEIVED })
    ).toBeTruthy()
    expect(
      canRequestForOfferReceiveOffers({ ...requestForOffer, state: RequestForOfferState.PARTIALLY_FULFILLED })
    ).toBeTruthy()
  })
})
