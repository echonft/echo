import { isOfferModalDeclineButtonDisplayed } from '../../../src/helpers/offer/is-offer-modal-decline-button-displayed'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - isOfferModalDeclineButtonDisplayed', () => {
  it('if state is OPEN, returns true', () => {
    expect(isOfferModalDeclineButtonDisplayed('OPEN')).toBeTruthy()
  })

  it('if state is ACCEPTED, returns true', () => {
    expect(isOfferModalDeclineButtonDisplayed('ACCEPTED')).toBeTruthy()
  })

  it('if state is not ACCEPTED or OPEN, returns false', () => {
    expect(isOfferModalDeclineButtonDisplayed('CANCELLED')).toBeFalsy()
    expect(isOfferModalDeclineButtonDisplayed('INVALID')).toBeFalsy()
    expect(isOfferModalDeclineButtonDisplayed('REJECTED')).toBeFalsy()
  })
})
