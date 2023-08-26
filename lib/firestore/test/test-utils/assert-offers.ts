import { getAllOffers } from '../../src/crud/offer/get-all-offers'
import { Offer } from '../../src/types/model/offer'
import { getAllOfferMocks } from '../mocks/get-all-offer-mocks'
import { getOfferMockById } from '../mocks/get-offer-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertOffers() {
  const offerMocks = getAllOfferMocks()
  const offers = await getAllOffers()
  expect(offers.length).toEqual(offerMocks.length)
  forEach((offer: Offer) => {
    expect(getOfferMockById(offer.id)).toStrictEqual(offer)
  }, offers)
}
