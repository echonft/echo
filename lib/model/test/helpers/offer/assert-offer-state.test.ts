import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { assertOfferState } from '@echo/model/helpers/offer/assert/assert-offer-state'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { assoc } from 'ramda'

describe('helpers - offer - assert - assertOfferStateState  - to state ACCEPTED', () => {
  const offerMock = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
  it('throw if the offer is expired', () => {
    const expiredOffer = assoc('expired', true, offerMock)
    expect(() => assertOfferState(assoc('state', OFFER_STATE_CANCELLED, expiredOffer), OFFER_STATE_ACCEPTED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_REJECTED, expiredOffer), OFFER_STATE_ACCEPTED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_ACCEPTED, expiredOffer), OFFER_STATE_ACCEPTED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_COMPLETED, expiredOffer), OFFER_STATE_ACCEPTED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_OPEN, expiredOffer), OFFER_STATE_ACCEPTED)).toThrow()
  })
  it('throw if the offer is cancelled', () => {
    const offer = assoc('state', OFFER_STATE_CANCELLED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_ACCEPTED)).toThrow()
  })
  it('throw if the offer is accepted', () => {
    const offer = assoc('state', OFFER_STATE_ACCEPTED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_ACCEPTED)).toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = assoc('state', OFFER_STATE_REJECTED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_ACCEPTED)).toThrow()
  })
  it('throw if the offer is completed', () => {
    const offer = assoc('state', OFFER_STATE_COMPLETED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_ACCEPTED)).toThrow()
  })
  it('does not throw if the offer is open', () => {
    const offer = assoc('state', OFFER_STATE_OPEN, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_ACCEPTED)).not.toThrow()
  })
})

describe('helpers - offer - assertOfferStateState - to state REJECTED', () => {
  const offerMock = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
  it('throw if the offer is expired', () => {
    const expiredOffer = assoc('expired', true, offerMock)
    expect(() => assertOfferState(assoc('state', OFFER_STATE_CANCELLED, expiredOffer), OFFER_STATE_REJECTED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_REJECTED, expiredOffer), OFFER_STATE_REJECTED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_ACCEPTED, expiredOffer), OFFER_STATE_REJECTED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_COMPLETED, expiredOffer), OFFER_STATE_REJECTED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_OPEN, expiredOffer), OFFER_STATE_REJECTED)).toThrow()
  })
  it('throw if the offer is cancelled', () => {
    const offer = assoc('state', OFFER_STATE_CANCELLED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_REJECTED)).toThrow()
  })
  it('throw if the offer is accepted', () => {
    const offer = assoc('state', OFFER_STATE_ACCEPTED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_REJECTED)).toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = assoc('state', OFFER_STATE_REJECTED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_REJECTED)).toThrow()
  })
  it('throw if the offer is completed', () => {
    const offer = assoc('state', OFFER_STATE_COMPLETED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_REJECTED)).toThrow()
  })
  it('does not throw if the offer is open', () => {
    const offer = assoc('state', OFFER_STATE_OPEN, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_REJECTED)).not.toThrow()
  })
})

describe('helpers - offer - assertOfferStateState - to state CANCELLED', () => {
  const offerMock = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
  it('throw if the offer is expired', () => {
    const expiredOffer = assoc('expired', true, offerMock)
    expect(() => assertOfferState(assoc('state', OFFER_STATE_CANCELLED, expiredOffer), OFFER_STATE_CANCELLED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_REJECTED, expiredOffer), OFFER_STATE_CANCELLED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_ACCEPTED, expiredOffer), OFFER_STATE_CANCELLED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_COMPLETED, expiredOffer), OFFER_STATE_CANCELLED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_OPEN, expiredOffer), OFFER_STATE_CANCELLED)).toThrow()
  })
  it('throw if the offer is cancelled', () => {
    const offer = assoc('state', OFFER_STATE_CANCELLED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_CANCELLED)).toThrow()
  })
  it('does not throw if the offer is accepted', () => {
    const offer = assoc('state', OFFER_STATE_ACCEPTED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_CANCELLED)).not.toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = assoc('state', OFFER_STATE_REJECTED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_CANCELLED)).toThrow()
  })
  it('throw if the offer is completed', () => {
    const offer = assoc('state', OFFER_STATE_COMPLETED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_CANCELLED)).toThrow()
  })
  it('does not throw if the offer is open', () => {
    const offer = assoc('state', OFFER_STATE_OPEN, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_CANCELLED)).not.toThrow()
  })
})

describe('helpers - offer - assertOfferStateState - to state COMPLETED', () => {
  const offerMock = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
  it('throw if the offer is expired', () => {
    const expiredOffer = assoc('expired', true, offerMock)
    expect(() => assertOfferState(assoc('state', OFFER_STATE_CANCELLED, expiredOffer), OFFER_STATE_COMPLETED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_REJECTED, expiredOffer), OFFER_STATE_COMPLETED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_ACCEPTED, expiredOffer), OFFER_STATE_COMPLETED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_COMPLETED, expiredOffer), OFFER_STATE_COMPLETED)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_OPEN, expiredOffer), OFFER_STATE_COMPLETED)).toThrow()
  })
  it('throw if the offer is cancelled', () => {
    const offer = assoc('state', OFFER_STATE_CANCELLED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_COMPLETED)).toThrow()
  })
  it('does not throw if the offer is accepted', () => {
    const offer = assoc('state', OFFER_STATE_ACCEPTED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_COMPLETED)).not.toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = assoc('state', OFFER_STATE_REJECTED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_COMPLETED)).toThrow()
  })
  it('throw if the offer is completed', () => {
    const offer = assoc('state', OFFER_STATE_COMPLETED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_COMPLETED)).toThrow()
  })
  it('throw if the offer is open', () => {
    const offer = assoc('state', OFFER_STATE_OPEN, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_COMPLETED)).toThrow()
  })
})

describe('helpers - offer - assertOfferStateState - to state OPEN', () => {
  const offerMock = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
  it('throw if the offer is expired', () => {
    const expiredOffer = assoc('expired', true, offerMock)
    expect(() => assertOfferState(assoc('state', OFFER_STATE_CANCELLED, expiredOffer), OFFER_STATE_OPEN)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_REJECTED, expiredOffer), OFFER_STATE_OPEN)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_ACCEPTED, expiredOffer), OFFER_STATE_OPEN)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_COMPLETED, expiredOffer), OFFER_STATE_OPEN)).toThrow()
    expect(() => assertOfferState(assoc('state', OFFER_STATE_OPEN, expiredOffer), OFFER_STATE_OPEN)).toThrow()
  })
  it('throw if the offer is cancelled', () => {
    const offer = assoc('state', OFFER_STATE_CANCELLED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_OPEN)).toThrow()
  })
  it('throw if the offer is accepted', () => {
    const offer = assoc('state', OFFER_STATE_ACCEPTED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_OPEN)).toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = assoc('state', OFFER_STATE_REJECTED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_OPEN)).toThrow()
  })
  it('throw if the offer is completed', () => {
    const offer = assoc('state', OFFER_STATE_COMPLETED, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_OPEN)).toThrow()
  })
  it('throw if the offer is open', () => {
    const offer = assoc('state', OFFER_STATE_OPEN, offerMock)
    expect(() => assertOfferState(offer, OFFER_STATE_OPEN)).toThrow()
  })
})
