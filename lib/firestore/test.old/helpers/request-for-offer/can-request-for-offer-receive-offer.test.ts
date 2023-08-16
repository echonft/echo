import { canRequestForOfferReceiveOffers } from '../../../src/helpers/request-for-offer/can-request-for-offer-receive-offers'
import { requestForOfferFirestoreData } from '../../mocks/request-for-offer/request-for-offer-firestore-data'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('utils - request-for-offer - canRequestForOfferReceiveOffer', () => {
  const requestForOffer = {
    ...requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!,
    expiresAt: dayjs().add(1, 'hour')
  }
  it('if expired, returns false', () => {
    expect(canRequestForOfferReceiveOffers(dayjs().subtract(1, 'hour'), requestForOffer.state)).toBeFalsy()
  })
  it('if not in created, offer received or partially fulfilled, returns false', () => {
    expect(canRequestForOfferReceiveOffers(requestForOffer.expiresAt, 'CANCELLED')).toBeFalsy()
    expect(canRequestForOfferReceiveOffers(requestForOffer.expiresAt, 'EXPIRED')).toBeFalsy()
    expect(canRequestForOfferReceiveOffers(requestForOffer.expiresAt, 'FULFILLED')).toBeFalsy()
  })
  it('if request for offer is in proper state, returns true', () => {
    expect(canRequestForOfferReceiveOffers(requestForOffer.expiresAt, 'CREATED')).toBeTruthy()
    expect(canRequestForOfferReceiveOffers(requestForOffer.expiresAt, 'OFFER_RECEIVED')).toBeTruthy()
    expect(canRequestForOfferReceiveOffers(requestForOffer.expiresAt, 'PARTIALLY_FULFILLED')).toBeTruthy()
  })
})
