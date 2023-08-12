import { generateRequestForOfferStateFromOfferState } from '../../../src/builders/request-for-offer/generate-request-for-offer-state-from-offer-state'
import { describe, expect, test } from '@jest/globals'

describe('utils - request-for-offer - generateRequestForOfferStateFromOfferState', () => {
  test('returns proper state', () => {
    let state = generateRequestForOfferStateFromOfferState('ACCEPTED')
    expect(state).toBe('PARTIALLY_FULFILLED')
    state = generateRequestForOfferStateFromOfferState('OPEN')
    expect(state).toBe('OFFER_RECEIVED')
    state = generateRequestForOfferStateFromOfferState('EXPIRED')
    expect(state).toBe('OFFER_RECEIVED')
    state = generateRequestForOfferStateFromOfferState('COMPLETED')
    expect(state).toBe('FULFILLED')
    state = generateRequestForOfferStateFromOfferState('CANCELLED')
    expect(state).toBe('OFFER_RECEIVED')
    state = generateRequestForOfferStateFromOfferState('REJECTED')
    expect(state).toBe('OFFER_RECEIVED')
  })
})
