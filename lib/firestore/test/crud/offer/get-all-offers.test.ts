import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { getAllOfferMocks } from '@echo/model/mocks/offer/get-all-offer-mocks'
import { eqList } from '@echo/utils/fp/eq-list'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getAllOffers', () => {
  it('get all offers', async () => {
    const offerMocks = getAllOfferMocks()
    const offers = await getAllOffers()
    expect(eqList(offers, offerMocks)).toBeTruthy()
  })
})
