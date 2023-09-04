import { assertOffer } from '../../../src/lib/server/helpers/offer/assert-offer'
import { Offer } from '@echo/firestore-types'

describe('helpers - offer - assertOffer', () => {
  it('throws if offer is undefined', () => {
    expect(() => assertOffer(undefined)).toThrow()
  })
  it('does not throw if offer is defined', () => {
    expect(() => assertOffer({ id: 'offerId' } as Offer)).not.toThrow()
  })
})
