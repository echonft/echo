import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { assertOfferStateTransition } from '@echo/model/helpers/offer/assert/assert-offer-state-transition'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model-mocks/offer/offer-mock'
import { describe, expect, it } from '@jest/globals'
import { assoc } from 'ramda'

describe('helpers - offer - assert - assertOfferStateTransition', () => {
  it('throws if the offer is undefined', () => {
    expect(() => assertOfferStateTransition(undefined, OFFER_STATE_ACCEPTED)).toThrow()
  })
})

describe('helpers - offer - assert - assertOfferStateTransition - to state ACCEPTED', () => {
  const offerMock = getOfferMockById(offerMockToJohnnycageId())
  it('throws if the offer is read only', () => {
    const offer = assoc('readOnly', true, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_ACCEPTED)).toThrow()
  })
  it('throws if the offer is accepted', () => {
    const offer = assoc('state', OFFER_STATE_ACCEPTED, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_ACCEPTED)).toThrow()
  })
  it('does not throws if the offer is open', () => {
    const offer = assoc('state', OFFER_STATE_OPEN, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_ACCEPTED)).not.toThrow()
  })
})

describe('helpers - offer - assertOfferState - to state REJECTED', () => {
  const offerMock = getOfferMockById(offerMockToJohnnycageId())
  it('throws if the offer is read only', () => {
    const offer = assoc('readOnly', true, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_REJECTED)).toThrow()
  })
  it('throws if the offer is accepted', () => {
    const offer = assoc('state', OFFER_STATE_ACCEPTED, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_REJECTED)).toThrow()
  })
  it('does not throws if the offer is open', () => {
    const offer = assoc('state', OFFER_STATE_OPEN, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_REJECTED)).not.toThrow()
  })
})

describe('helpers - offer - assertOfferState - to state CANCELLED', () => {
  const offerMock = getOfferMockById(offerMockToJohnnycageId())
  it('throws if the offer is read only', () => {
    const offer = assoc('readOnly', true, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_CANCELLED)).toThrow()
  })
  it('throws if the offer is accepted', () => {
    const offer = assoc('state', OFFER_STATE_ACCEPTED, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_CANCELLED)).toThrow()
  })
  it('throws if the offer is rejected', () => {
    const offer = assoc('state', OFFER_STATE_REJECTED, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_CANCELLED)).toThrow()
  })
  it('does not throws if the offer is open', () => {
    const offer = assoc('state', OFFER_STATE_OPEN, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_CANCELLED)).not.toThrow()
  })
})

describe('helpers - offer - assertOfferState - to state COMPLETED', () => {
  const offerMock = getOfferMockById(offerMockToJohnnycageId())
  it('throws if the offer is read only', () => {
    const offer = assoc('readOnly', true, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_COMPLETED)).toThrow()
  })
  it('does not throws if the offer is accepted', () => {
    const offer = assoc('state', OFFER_STATE_ACCEPTED, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_COMPLETED)).not.toThrow()
  })
  it('throws if the offer is open', () => {
    const offer = assoc('state', OFFER_STATE_OPEN, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_COMPLETED)).toThrow()
  })
})

describe('helpers - offer - assertOfferState - to state OPEN', () => {
  const offerMock = getOfferMockById(offerMockToJohnnycageId())
  it('throws if the offer is read only', () => {
    const offer = assoc('readOnly', true, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_OPEN)).toThrow()
  })
  it('throws if the offer is accepted', () => {
    const offer = assoc('state', OFFER_STATE_ACCEPTED, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_OPEN)).toThrow()
  })
  it('throws if the offer is open', () => {
    const offer = assoc('state', OFFER_STATE_OPEN, offerMock)
    expect(() => assertOfferStateTransition(offer, OFFER_STATE_OPEN)).toThrow()
  })
})
