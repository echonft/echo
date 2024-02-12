import { getAllOffers } from '@echo/firestore-test/offer/get-all-offers'
import { type Offer } from '@echo/model/types/offer'
import { getAllOfferMocks } from '@echo/model-mocks/offer/get-all-offer-mocks'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('CRUD - offer - getAllOffers', () => {
  it('get all offers', async () => {
    const offerMocks = getAllOfferMocks()
    const offers = await getAllOffers()
    expect(offers.length).toEqual(offerMocks.length)
    forEach((offer: Offer) => {
      expect(getOfferMockById(offer.id)).toStrictEqual(offer)
    }, offers)
  })
})
