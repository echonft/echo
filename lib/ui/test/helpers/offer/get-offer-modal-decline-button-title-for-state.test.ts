import { getOfferModalDeclineButtonTitleForState } from '@echo/ui/helpers/offer/get-offer-modal-decline-button-title-for-state'
import { describe, expect, it } from '@jest/globals'

describe('helpers - getOfferModalDeclineButtonTitleForState', () => {
  it('if state is OPEN and user is receiver, returns declineBtn', () => {
    expect(getOfferModalDeclineButtonTitleForState('OPEN', true)).toBe('rejectBtn')
  })

  it('if state is OPEN and user is not receiver, returns cancel', () => {
    expect(getOfferModalDeclineButtonTitleForState('OPEN', false)).toBe('cancelBtn')
  })

  it('if state is ACCEPTED, returns cancel', () => {
    expect(getOfferModalDeclineButtonTitleForState('ACCEPTED', true)).toBe('cancelBtn')
    expect(getOfferModalDeclineButtonTitleForState('ACCEPTED', false)).toBe('cancelBtn')
  })

  it('if state is anything else, throw', () => {
    expect(() => getOfferModalDeclineButtonTitleForState('CANCELLED', true)).toThrow()
    expect(() => getOfferModalDeclineButtonTitleForState('CANCELLED', true)).toThrow()
    expect(() => getOfferModalDeclineButtonTitleForState('INVALID', true)).toThrow()
    expect(() => getOfferModalDeclineButtonTitleForState('INVALID', false)).toThrow()
    expect(() => getOfferModalDeclineButtonTitleForState('REJECTED', true)).toThrow()
    expect(() => getOfferModalDeclineButtonTitleForState('REJECTED', false)).toThrow()
  })
})
