import { isOfferModalAcceptButtonDisplayed } from '@echo/ui/helpers/offer/is-offer-modal-accept-button-displayed'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - isOfferModalAcceptButtonDisplayed', () => {
  it('if state is OPEN and is receiver, returns true', () => {
    expect(isOfferModalAcceptButtonDisplayed('OPEN', true)).toBeTruthy()
  })

  it('if state is OPEN and is not receiver, returns false', () => {
    expect(isOfferModalAcceptButtonDisplayed('OPEN', false)).toBeFalsy()
  })

  it('if state is ACCEPTED, returns true', () => {
    expect(isOfferModalAcceptButtonDisplayed('ACCEPTED', true)).toBeTruthy()
    expect(isOfferModalAcceptButtonDisplayed('ACCEPTED', false)).toBeTruthy()
  })

  it('if state is not ACCEPTED or OPEN, returns false', () => {
    expect(isOfferModalAcceptButtonDisplayed('CANCELLED', true)).toBeFalsy()
    expect(isOfferModalAcceptButtonDisplayed('CANCELLED', false)).toBeFalsy()
    expect(isOfferModalAcceptButtonDisplayed('REJECTED', true)).toBeFalsy()
    expect(isOfferModalAcceptButtonDisplayed('REJECTED', false)).toBeFalsy()
  })
})
