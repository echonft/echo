import { isOfferModalAcceptButtonDisplayed } from '../../src/helpers/is-offer-modal-accept-button-displayed'
import { describe, expect, it } from '@jest/globals'

describe('helpers - isOfferModalAcceptButtonDisplayed', () => {
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
    expect(isOfferModalAcceptButtonDisplayed('INVALID', true)).toBeFalsy()
    expect(isOfferModalAcceptButtonDisplayed('INVALID', false)).toBeFalsy()
    expect(isOfferModalAcceptButtonDisplayed('REJECTED', true)).toBeFalsy()
    expect(isOfferModalAcceptButtonDisplayed('REJECTED', false)).toBeFalsy()
  })
})
