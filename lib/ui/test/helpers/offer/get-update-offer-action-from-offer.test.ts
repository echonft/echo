import { getUpdateOfferActionFromOffer } from '@echo/ui/helpers/offer/get-update-offer-action-from-offer'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - getUpdateOfferActionFromOffer', () => {
  it('if state is CANCELLED, to throw', () => {
    expect(() => getUpdateOfferActionFromOffer('CANCELLED', true, true)).toThrow()
    expect(() => getUpdateOfferActionFromOffer('CANCELLED', false, true)).toThrow()
    expect(() => getUpdateOfferActionFromOffer('CANCELLED', true, false)).toThrow()
  })
  it('if state is INVALID, to throw', () => {
    expect(() => getUpdateOfferActionFromOffer('INVALID', true, true)).toThrow()
    expect(() => getUpdateOfferActionFromOffer('INVALID', false, true)).toThrow()
    expect(() => getUpdateOfferActionFromOffer('INVALID', true, false)).toThrow()
  })
  it('if state is REJECTED, to throw', () => {
    expect(() => getUpdateOfferActionFromOffer('REJECTED', true, true)).toThrow()
    expect(() => getUpdateOfferActionFromOffer('REJECTED', false, true)).toThrow()
    expect(() => getUpdateOfferActionFromOffer('REJECTED', true, false)).toThrow()
  })
  it('if state is COMPLETED, to throw', () => {
    expect(() => getUpdateOfferActionFromOffer('COMPLETED', true, true)).toThrow()
    expect(() => getUpdateOfferActionFromOffer('COMPLETED', false, true)).toThrow()
    expect(() => getUpdateOfferActionFromOffer('COMPLETED', true, false)).toThrow()
  })
  it('if state is COMPLETED, to throw', () => {
    expect(() => getUpdateOfferActionFromOffer('COMPLETED', true, true)).toThrow()
    expect(() => getUpdateOfferActionFromOffer('COMPLETED', false, true)).toThrow()
    expect(() => getUpdateOfferActionFromOffer('COMPLETED', true, false)).toThrow()
  })
  it('if state is OPEN, user does not decline and is receiver, returns ACCEPT', () => {
    expect(getUpdateOfferActionFromOffer('OPEN', true, false)).toBe(2)
  })
  it('if state is OPEN, user does not decline and is not receiver, to throw', () => {
    expect(() => getUpdateOfferActionFromOffer('OPEN', false, false)).toThrow()
  })
  it('if state is OPEN, user declines and is receiver, returns REJECT', () => {
    expect(getUpdateOfferActionFromOffer('OPEN', true, true)).toBe(1)
  })
  it('if state is OPEN, user declines and is not receiver, returns CANCEL', () => {
    expect(getUpdateOfferActionFromOffer('OPEN', false, true)).toBe(0)
  })
  it('if state is ACCEPTED and user declines, returns CANCEL', () => {
    expect(getUpdateOfferActionFromOffer('ACCEPTED', true, true)).toBe(0)
    expect(getUpdateOfferActionFromOffer('ACCEPTED', false, true)).toBe(0)
  })
  it('if state is ACCEPTED, user does not decline and is receiver, to throw', () => {
    expect(() => getUpdateOfferActionFromOffer('ACCEPTED', true, false)).toThrow()
  })
  it('if state is ACCEPTED, user does not decline and is not receiver, to throw', () => {
    expect(() => getUpdateOfferActionFromOffer('ACCEPTED', false, false)).toThrow()
  })
})
