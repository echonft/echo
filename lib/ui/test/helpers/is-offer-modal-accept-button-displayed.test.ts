import { isOfferModalAcceptButtonDisplayed } from '../../src/helpers/is-offer-modal-accept-button-displayed'
import { describe, expect, it } from '@jest/globals'

describe('helpers - isOfferModalAcceptButtonDisplayed', () => {
  it('if state is OPEN, returns true', () => {
    expect(isOfferModalAcceptButtonDisplayed('OPEN')).toBeTruthy()
  })

  it('if state is ACCEPTED, returns true', () => {
    expect(isOfferModalAcceptButtonDisplayed('ACCEPTED')).toBeTruthy()
  })

  it('if state is not ACCEPTED or OPEN, returns false', () => {
    expect(isOfferModalAcceptButtonDisplayed('CANCELLED')).toBeFalsy()
    expect(isOfferModalAcceptButtonDisplayed('INVALID')).toBeFalsy()
    expect(isOfferModalAcceptButtonDisplayed('REJECTED')).toBeFalsy()
  })
})
