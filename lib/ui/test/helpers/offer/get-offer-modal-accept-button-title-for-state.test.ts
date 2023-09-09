import { getOfferModalAcceptButtonTitleForState } from '../../../src/helpers/offer/get-offer-modal-accept-button-title-for-state'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - getOfferModalAcceptButtonTitleForState', () => {
  it('if state is OPEN, returns acceptBtn', () => {
    expect(getOfferModalAcceptButtonTitleForState('OPEN')).toBe('acceptBtn')
  })

  it('if state is ACCEPTED, returns approveBtn', () => {
    expect(getOfferModalAcceptButtonTitleForState('ACCEPTED')).toBe('approveBtn')
  })

  it('if state is not ACCEPTED or OPEN, returns null', () => {
    expect(getOfferModalAcceptButtonTitleForState('CANCELLED')).toBeUndefined()
    expect(getOfferModalAcceptButtonTitleForState('INVALID')).toBeUndefined()
    expect(getOfferModalAcceptButtonTitleForState('REJECTED')).toBeUndefined()
  })
})
