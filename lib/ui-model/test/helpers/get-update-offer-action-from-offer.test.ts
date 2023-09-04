import { getUpdateOfferActionFromOffer } from '../../src/helpers/get-update-offer-action-from-offer'
import { UpdateOfferAction } from '@echo/api'
import { describe, expect, it } from '@jest/globals'

describe('helpers - getUpdateOfferActionFromOffer', () => {
  it('if state is CANCELLED, returns undefined', () => {
    expect(getUpdateOfferActionFromOffer('CANCELLED', true, true)).toBeUndefined()
    expect(getUpdateOfferActionFromOffer('CANCELLED', false, true)).toBeUndefined()
    expect(getUpdateOfferActionFromOffer('CANCELLED', true, false)).toBeUndefined()
  })
  it('if state is INVALID, returns undefined', () => {
    expect(getUpdateOfferActionFromOffer('INVALID', true, true)).toBeUndefined()
    expect(getUpdateOfferActionFromOffer('INVALID', false, true)).toBeUndefined()
    expect(getUpdateOfferActionFromOffer('INVALID', true, false)).toBeUndefined()
  })
  it('if state is REJECTED, returns undefined', () => {
    expect(getUpdateOfferActionFromOffer('REJECTED', true, true)).toBeUndefined()
    expect(getUpdateOfferActionFromOffer('REJECTED', false, true)).toBeUndefined()
    expect(getUpdateOfferActionFromOffer('REJECTED', true, false)).toBeUndefined()
  })
  it('if state is COMPLETED, returns undefined', () => {
    expect(getUpdateOfferActionFromOffer('COMPLETED', true, true)).toBeUndefined()
    expect(getUpdateOfferActionFromOffer('COMPLETED', false, true)).toBeUndefined()
    expect(getUpdateOfferActionFromOffer('COMPLETED', true, false)).toBeUndefined()
  })
  it('if state is COMPLETED, returns undefined', () => {
    expect(getUpdateOfferActionFromOffer('COMPLETED', true, true)).toBeUndefined()
    expect(getUpdateOfferActionFromOffer('COMPLETED', false, true)).toBeUndefined()
    expect(getUpdateOfferActionFromOffer('COMPLETED', true, false)).toBeUndefined()
  })
  it('if state is OPEN, user does not decline and is receiver, returns ACCEPT', () => {
    expect(getUpdateOfferActionFromOffer('OPEN', true, false)).toBe(UpdateOfferAction.ACCEPT)
  })
  it('if state is OPEN, user does not decline and is not receiver, returns undefined', () => {
    expect(getUpdateOfferActionFromOffer('OPEN', false, false)).toBeUndefined()
  })
  it('if state is OPEN, user declines and is receiver, returns REJECT', () => {
    expect(getUpdateOfferActionFromOffer('OPEN', true, true)).toBe(UpdateOfferAction.REJECT)
  })
  it('if state is OPEN, user declines and is not receiver, returns CANCEL', () => {
    expect(getUpdateOfferActionFromOffer('OPEN', false, true)).toBe(UpdateOfferAction.CANCEL)
  })
  it('if state is ACCEPTED and user declines, returns CANCEL', () => {
    expect(getUpdateOfferActionFromOffer('ACCEPTED', true, true)).toBe(UpdateOfferAction.CANCEL)
    expect(getUpdateOfferActionFromOffer('ACCEPTED', false, true)).toBe(UpdateOfferAction.CANCEL)
  })
  it('if state is ACCEPTED, user does not decline and is receiver, returns COMPLETE', () => {
    expect(getUpdateOfferActionFromOffer('ACCEPTED', true, false)).toBe(UpdateOfferAction.COMPLETE)
  })
  it('if state is ACCEPTED, user does not decline and is not receiver, returns undefined', () => {
    expect(getUpdateOfferActionFromOffer('ACCEPTED', false, false)).toBeUndefined()
  })
})
