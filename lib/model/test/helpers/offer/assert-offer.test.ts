import { assertOffer } from '@echo/model/helpers/offer/assert/assert-offer'
import type { Offer } from '@echo/model/types/offer'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { assoc } from 'ramda'

describe('helpers - offer - assert - assertOffer', () => {
  it('throw if the offer is undefined', () => {
    expect(() => assertOffer(undefined)).toThrow()
  })
  it('throw if the offer id is undefined', () => {
    const offer = assoc('id', undefined, getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')) as unknown as Offer
    expect(() => assertOffer(offer)).toThrow()
  })
  it('does not throw if the offer is defined', () => {
    expect(() => assertOffer(getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'))).not.toThrow()
  })
})
