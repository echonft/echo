import { getOfferModalDeclineButtonTitleForState } from '../../src/helpers/get-offer-modal-decline-button-title-for-state'
import { describe, expect, it } from '@jest/globals'

describe('helpers - getOfferModalDeclineButtonTitleForState', () => {
  it('if state is anything, returns declineBtn', () => {
    expect(getOfferModalDeclineButtonTitleForState('OPEN')).toBe('declineBtn')
    expect(getOfferModalDeclineButtonTitleForState('ACCEPTED')).toBe('declineBtn')
    expect(getOfferModalDeclineButtonTitleForState('CANCELLED')).toBe('declineBtn')
    expect(getOfferModalDeclineButtonTitleForState('INVALID')).toBe('declineBtn')
    expect(getOfferModalDeclineButtonTitleForState('REJECTED')).toBe('declineBtn')
  })
})
