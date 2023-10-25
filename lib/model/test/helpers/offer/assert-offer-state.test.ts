import { assertOfferState } from '@echo/model/helpers/offer/assert/assert-offer-state'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { assoc } from 'ramda'

describe('helpers - offer - assert - assertOfferStateState  - to state ACCEPTED', () => {
  const offerMock = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
  it('throw if the offer is expired', () => {
    const expiredOffer = assoc('expired', true, offerMock)
    expect(() => assertOfferState(assoc('state', 'CANCELLED', expiredOffer), 'ACCEPTED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'REJECTED', expiredOffer), 'ACCEPTED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'ACCEPTED', expiredOffer), 'ACCEPTED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'COMPLETED', expiredOffer), 'ACCEPTED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'OPEN', expiredOffer), 'ACCEPTED')).toThrow()
  })
  it('throw if the offer is cancelled', () => {
    const offer = assoc('state', 'CANCELLED', offerMock)
    expect(() => assertOfferState(offer, 'ACCEPTED')).toThrow()
  })
  it('throw if the offer is accepted', () => {
    const offer = assoc('state', 'ACCEPTED', offerMock)
    expect(() => assertOfferState(offer, 'ACCEPTED')).toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = assoc('state', 'REJECTED', offerMock)
    expect(() => assertOfferState(offer, 'ACCEPTED')).toThrow()
  })
  it('throw if the offer is completed', () => {
    const offer = assoc('state', 'COMPLETED', offerMock)
    expect(() => assertOfferState(offer, 'ACCEPTED')).toThrow()
  })
  it('does not throw if the offer is open', () => {
    const offer = assoc('state', 'OPEN', offerMock)
    expect(() => assertOfferState(offer, 'ACCEPTED')).not.toThrow()
  })
})

describe('helpers - offer - assertOfferStateState - to state REJECTED', () => {
  const offerMock = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
  it('throw if the offer is expired', () => {
    const expiredOffer = assoc('expired', true, offerMock)
    expect(() => assertOfferState(assoc('state', 'CANCELLED', expiredOffer), 'REJECTED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'REJECTED', expiredOffer), 'REJECTED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'ACCEPTED', expiredOffer), 'REJECTED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'COMPLETED', expiredOffer), 'REJECTED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'OPEN', expiredOffer), 'REJECTED')).toThrow()
  })
  it('throw if the offer is cancelled', () => {
    const offer = assoc('state', 'CANCELLED', offerMock)
    expect(() => assertOfferState(offer, 'REJECTED')).toThrow()
  })
  it('throw if the offer is accepted', () => {
    const offer = assoc('state', 'ACCEPTED', offerMock)
    expect(() => assertOfferState(offer, 'REJECTED')).toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = assoc('state', 'REJECTED', offerMock)
    expect(() => assertOfferState(offer, 'REJECTED')).toThrow()
  })
  it('throw if the offer is completed', () => {
    const offer = assoc('state', 'COMPLETED', offerMock)
    expect(() => assertOfferState(offer, 'REJECTED')).toThrow()
  })
  it('does not throw if the offer is open', () => {
    const offer = assoc('state', 'OPEN', offerMock)
    expect(() => assertOfferState(offer, 'REJECTED')).not.toThrow()
  })
})

describe('helpers - offer - assertOfferStateState - to state CANCELLED', () => {
  const offerMock = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
  it('throw if the offer is expired', () => {
    const expiredOffer = assoc('expired', true, offerMock)
    expect(() => assertOfferState(assoc('state', 'CANCELLED', expiredOffer), 'CANCELLED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'REJECTED', expiredOffer), 'CANCELLED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'ACCEPTED', expiredOffer), 'CANCELLED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'COMPLETED', expiredOffer), 'CANCELLED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'OPEN', expiredOffer), 'CANCELLED')).toThrow()
  })
  it('throw if the offer is cancelled', () => {
    const offer = assoc('state', 'CANCELLED', offerMock)
    expect(() => assertOfferState(offer, 'CANCELLED')).toThrow()
  })
  it('does not throw if the offer is accepted', () => {
    const offer = assoc('state', 'ACCEPTED', offerMock)
    expect(() => assertOfferState(offer, 'CANCELLED')).not.toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = assoc('state', 'REJECTED', offerMock)
    expect(() => assertOfferState(offer, 'CANCELLED')).toThrow()
  })
  it('throw if the offer is completed', () => {
    const offer = assoc('state', 'COMPLETED', offerMock)
    expect(() => assertOfferState(offer, 'CANCELLED')).toThrow()
  })
  it('does not throw if the offer is open', () => {
    const offer = assoc('state', 'OPEN', offerMock)
    expect(() => assertOfferState(offer, 'CANCELLED')).not.toThrow()
  })
})

describe('helpers - offer - assertOfferStateState - to state COMPLETED', () => {
  const offerMock = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
  it('throw if the offer is expired', () => {
    const expiredOffer = assoc('expired', true, offerMock)
    expect(() => assertOfferState(assoc('state', 'CANCELLED', expiredOffer), 'COMPLETED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'REJECTED', expiredOffer), 'COMPLETED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'ACCEPTED', expiredOffer), 'COMPLETED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'COMPLETED', expiredOffer), 'COMPLETED')).toThrow()
    expect(() => assertOfferState(assoc('state', 'OPEN', expiredOffer), 'COMPLETED')).toThrow()
  })
  it('throw if the offer is cancelled', () => {
    const offer = assoc('state', 'CANCELLED', offerMock)
    expect(() => assertOfferState(offer, 'COMPLETED')).toThrow()
  })
  it('does not throw if the offer is accepted', () => {
    const offer = assoc('state', 'ACCEPTED', offerMock)
    expect(() => assertOfferState(offer, 'COMPLETED')).not.toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = assoc('state', 'REJECTED', offerMock)
    expect(() => assertOfferState(offer, 'COMPLETED')).toThrow()
  })
  it('throw if the offer is completed', () => {
    const offer = assoc('state', 'COMPLETED', offerMock)
    expect(() => assertOfferState(offer, 'COMPLETED')).toThrow()
  })
  it('throw if the offer is open', () => {
    const offer = assoc('state', 'OPEN', offerMock)
    expect(() => assertOfferState(offer, 'COMPLETED')).toThrow()
  })
})

describe('helpers - offer - assertOfferStateState - to state OPEN', () => {
  const offerMock = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
  it('throw if the offer is expired', () => {
    const expiredOffer = assoc('expired', true, offerMock)
    expect(() => assertOfferState(assoc('state', 'CANCELLED', expiredOffer), 'OPEN')).toThrow()
    expect(() => assertOfferState(assoc('state', 'REJECTED', expiredOffer), 'OPEN')).toThrow()
    expect(() => assertOfferState(assoc('state', 'ACCEPTED', expiredOffer), 'OPEN')).toThrow()
    expect(() => assertOfferState(assoc('state', 'COMPLETED', expiredOffer), 'OPEN')).toThrow()
    expect(() => assertOfferState(assoc('state', 'OPEN', expiredOffer), 'OPEN')).toThrow()
  })
  it('throw if the offer is cancelled', () => {
    const offer = assoc('state', 'CANCELLED', offerMock)
    expect(() => assertOfferState(offer, 'OPEN')).toThrow()
  })
  it('throw if the offer is accepted', () => {
    const offer = assoc('state', 'ACCEPTED', offerMock)
    expect(() => assertOfferState(offer, 'OPEN')).toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = assoc('state', 'REJECTED', offerMock)
    expect(() => assertOfferState(offer, 'OPEN')).toThrow()
  })
  it('throw if the offer is completed', () => {
    const offer = assoc('state', 'COMPLETED', offerMock)
    expect(() => assertOfferState(offer, 'OPEN')).toThrow()
  })
  it('throw if the offer is open', () => {
    const offer = assoc('state', 'OPEN', offerMock)
    expect(() => assertOfferState(offer, 'OPEN')).toThrow()
  })
})
