import { getOfferModalDeclineButtonTitleForState } from '../../src/helpers/get-offer-modal-decline-button-title-for-state'
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

  it('if state is anything else, returns undefined', () => {
    expect(getOfferModalDeclineButtonTitleForState('CANCELLED', true)).toBeUndefined()
    expect(getOfferModalDeclineButtonTitleForState('CANCELLED', true)).toBeUndefined()
    expect(getOfferModalDeclineButtonTitleForState('INVALID', true)).toBeUndefined()
    expect(getOfferModalDeclineButtonTitleForState('INVALID', false)).toBeUndefined()
    expect(getOfferModalDeclineButtonTitleForState('REJECTED', true)).toBeUndefined()
    expect(getOfferModalDeclineButtonTitleForState('REJECTED', false)).toBeUndefined()
  })
})
