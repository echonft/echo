import { OfferState } from '@echo/model/constants/offer-state'
import { assertOfferStateTransition } from '@echo/model/helpers/offer/assert-offer-state-transition'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { describe, expect, it } from '@jest/globals'
import { assoc } from 'ramda'

describe('helpers - offer - assert - assertOfferStateTransition', () => {
  it('throws if the offer is undefined', () => {
    expect(() => {
      assertOfferStateTransition(undefined, OfferState.Accepted)
    }).toThrow()
  })
})

describe('helpers - offer - assert - assertOfferStateTransition - to state ACCEPTED', () => {
  const offerMock = getOfferMockById(offerMockToJohnnycageId())
  it('throws if the offer is read only', () => {
    const offer = assoc('readOnly', true, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Accepted)
    }).toThrow()
  })
  it('throws if the offer is accepted', () => {
    const offer = assoc('state', OfferState.Accepted, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Accepted)
    }).toThrow()
  })
  it('does not throws if the offer is open', () => {
    const offer = assoc('state', OfferState.Open, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Accepted)
    }).not.toThrow()
  })
})

describe('helpers - offer - assertOfferState - to state REJECTED', () => {
  const offerMock = getOfferMockById(offerMockToJohnnycageId())
  it('throws if the offer is read only', () => {
    const offer = assoc('readOnly', true, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Rejected)
    }).toThrow()
  })
  it('throws if the offer is accepted', () => {
    const offer = assoc('state', OfferState.Accepted, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Rejected)
    }).toThrow()
  })
  it('does not throws if the offer is open', () => {
    const offer = assoc('state', OfferState.Open, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Rejected)
    }).not.toThrow()
  })
})

describe('helpers - offer - assertOfferState - to state CANCELLED', () => {
  const offerMock = getOfferMockById(offerMockToJohnnycageId())
  it('throws if the offer is read only', () => {
    const offer = assoc('readOnly', true, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Cancelled)
    }).toThrow()
  })
  it('throws if the offer is accepted', () => {
    const offer = assoc('state', OfferState.Accepted, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Cancelled)
    }).toThrow()
  })
  it('throws if the offer is rejected', () => {
    const offer = assoc('state', OfferState.Rejected, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Cancelled)
    }).toThrow()
  })
  it('does not throws if the offer is open', () => {
    const offer = assoc('state', OfferState.Open, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Cancelled)
    }).not.toThrow()
  })
})

describe('helpers - offer - assertOfferState - to state COMPLETED', () => {
  const offerMock = getOfferMockById(offerMockToJohnnycageId())
  it('throws if the offer is read only', () => {
    const offer = assoc('readOnly', true, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Completed)
    }).toThrow()
  })
  it('does not throws if the offer is accepted', () => {
    const offer = assoc('state', OfferState.Accepted, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Completed)
    }).not.toThrow()
  })
  it('throws if the offer is open', () => {
    const offer = assoc('state', OfferState.Open, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Completed)
    }).toThrow()
  })
})

describe('helpers - offer - assertOfferState - to state OPEN', () => {
  const offerMock = getOfferMockById(offerMockToJohnnycageId())
  it('throws if the offer is read only', () => {
    const offer = assoc('readOnly', true, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Open)
    }).toThrow()
  })
  it('throws if the offer is accepted', () => {
    const offer = assoc('state', OfferState.Accepted, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Open)
    }).toThrow()
  })
  it('throws if the offer is open', () => {
    const offer = assoc('state', OfferState.Open, offerMock)
    expect(() => {
      assertOfferStateTransition(offer, OfferState.Open)
    }).toThrow()
  })
})
