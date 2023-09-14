import { assertOfferState } from '@echo/firestore/helpers/offer/assert/assert-offer-state'
import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - assert - assertOfferStateState', () => {
  it('throw if the offer is cancelled', () => {
    const offer = {
      state: 'CANCELLED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'ACCEPTED')).toThrow()
  })
  it('throw if the offer is accepted', () => {
    const offer = {
      state: 'ACCEPTED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'ACCEPTED')).toThrow()
  })
  it('throw if the offer is invalid', () => {
    const offer = {
      state: 'INVALID'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'ACCEPTED')).toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = {
      state: 'REJECTED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'ACCEPTED')).toThrow()
  })
  it('throw if the offer is completed', () => {
    const offer = {
      state: 'COMPLETED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'ACCEPTED')).toThrow()
  })
  it('does not throw if the offer is open', () => {
    const offer = {
      state: 'OPEN'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'ACCEPTED')).not.toThrow()
  })
})

describe('helpers - offer - assertOfferStateState - to state REJECTED', () => {
  it('throw if the offer is cancelled', () => {
    const offer = {
      state: 'CANCELLED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'REJECTED')).toThrow()
  })
  it('throw if the offer is accepted', () => {
    const offer = {
      state: 'ACCEPTED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'REJECTED')).toThrow()
  })
  it('throw if the offer is invalid', () => {
    const offer = {
      state: 'INVALID'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'REJECTED')).toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = {
      state: 'REJECTED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'REJECTED')).toThrow()
  })
  it('throw if the offer is completed', () => {
    const offer = {
      state: 'COMPLETED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'REJECTED')).toThrow()
  })
  it('does not throw if the offer is open', () => {
    const offer = {
      state: 'OPEN'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'REJECTED')).not.toThrow()
  })
})

describe('helpers - offer - assertOfferStateState - to state INVALID', () => {
  it('throw if the offer is cancelled', () => {
    const offer = {
      state: 'CANCELLED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'INVALID')).toThrow()
  })
  it('does not throw if the offer is accepted', () => {
    const offer = {
      state: 'ACCEPTED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'INVALID')).not.toThrow()
  })
  it('throw if the offer is invalid', () => {
    const offer = {
      state: 'INVALID'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'INVALID')).toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = {
      state: 'REJECTED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'INVALID')).toThrow()
  })
  it('throw if the offer is completed', () => {
    const offer = {
      state: 'COMPLETED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'INVALID')).toThrow()
  })
  it('does not throw if the offer is open', () => {
    const offer = {
      state: 'OPEN'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'INVALID')).not.toThrow()
  })
})

describe('helpers - offer - assertOfferStateState - to state CANCELLED', () => {
  it('throw if the offer is cancelled', () => {
    const offer = {
      state: 'CANCELLED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'CANCELLED')).toThrow()
  })
  it('does not throw if the offer is accepted', () => {
    const offer = {
      state: 'ACCEPTED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'CANCELLED')).not.toThrow()
  })
  it('throw if the offer is invalid', () => {
    const offer = {
      state: 'INVALID'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'CANCELLED')).toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = {
      state: 'REJECTED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'CANCELLED')).toThrow()
  })
  it('throw if the offer is completed', () => {
    const offer = {
      state: 'COMPLETED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'CANCELLED')).toThrow()
  })
  it('does not throw if the offer is open', () => {
    const offer = {
      state: 'OPEN'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'CANCELLED')).not.toThrow()
  })
})

describe('helpers - offer - assertOfferStateState - to state COMPLETED', () => {
  it('throw if the offer is cancelled', () => {
    const offer = {
      state: 'CANCELLED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'COMPLETED')).toThrow()
  })
  it('does not throw if the offer is accepted', () => {
    const offer = {
      state: 'ACCEPTED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'COMPLETED')).not.toThrow()
  })
  it('throw if the offer is invalid', () => {
    const offer = {
      state: 'INVALID'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'COMPLETED')).toThrow()
  })
  it('throw if the offer is rejected', () => {
    const offer = {
      state: 'REJECTED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'COMPLETED')).toThrow()
  })
  it('throw if the offer is completed', () => {
    const offer = {
      state: 'COMPLETED'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'COMPLETED')).toThrow()
  })
  it('throw if the offer is open', () => {
    const offer = {
      state: 'OPEN'
    } as FirestoreOffer
    expect(() => assertOfferState(offer, 'COMPLETED')).toThrow()
  })
})
