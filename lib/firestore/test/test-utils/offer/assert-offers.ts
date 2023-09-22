import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { getAllOfferMocks } from '@echo/firestore-mocks/offer/get-all-offer-mocks'
import { getOfferMockById } from '@echo/firestore-mocks/offer/get-offer-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertOffers() {
  const offerMocks = getAllOfferMocks()
  const offers = await getAllOffers()
  expect(offers.length).toEqual(offerMocks.length)
  forEach((offer: FirestoreOffer) => {
    expect(offer).toStrictEqual(getOfferMockById(offer.id))
  }, offers)
}
