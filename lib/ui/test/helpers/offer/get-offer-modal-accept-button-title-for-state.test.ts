import { getOfferModalAcceptButtonTitleForState } from '@echo/ui/helpers/offer/get-offer-modal-accept-button-title-for-state'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - getOfferModalAcceptButtonTitleForState', () => {
  it('if state is OPEN, returns acceptBtn', () => {
    expect(getOfferModalAcceptButtonTitleForState('OPEN')).toBe('acceptBtn')
  })

  it('if state is ACCEPTED, returns approveBtn', () => {
    expect(getOfferModalAcceptButtonTitleForState('ACCEPTED')).toBe('approveBtn')
  })

  it('if state is not ACCEPTED or OPEN, throw', () => {
    expect(() => getOfferModalAcceptButtonTitleForState('CANCELLED')).toThrow()
    expect(() => getOfferModalAcceptButtonTitleForState('INVALID')).toThrow()
    expect(() => getOfferModalAcceptButtonTitleForState('REJECTED')).toThrow()
  })
})
