import { OfferState } from '../../src'
import { RequestForOfferState } from '../../src/types/request-for-offer-state'
import { generateRequestForOfferStateFromOfferState } from '../../src/utils/request-for-offer/generate-request-for-offer-state-from-offer-state'
import { describe, expect, test } from '@jest/globals'

describe('utils - request-for-offer - generateRequestForOfferStateFromOfferState', () => {
  test('returns proper state', () => {
    let state = generateRequestForOfferStateFromOfferState(OfferState.ACCEPTED)
    expect(state).toBe(RequestForOfferState.PARTIALLY_FULFILLED)
    state = generateRequestForOfferStateFromOfferState(OfferState.OPEN)
    expect(state).toBe(RequestForOfferState.OFFER_RECEIVED)
    state = generateRequestForOfferStateFromOfferState(OfferState.EXPIRED)
    expect(state).toBe(RequestForOfferState.OFFER_RECEIVED)
    state = generateRequestForOfferStateFromOfferState(OfferState.COMPLETED)
    expect(state).toBe(RequestForOfferState.FULFILLED)
    state = generateRequestForOfferStateFromOfferState(OfferState.CANCELLED)
    expect(state).toBe(RequestForOfferState.OFFER_RECEIVED)
    state = generateRequestForOfferStateFromOfferState(OfferState.REJECTED)
    expect(state).toBe(RequestForOfferState.OFFER_RECEIVED)
  })
})
