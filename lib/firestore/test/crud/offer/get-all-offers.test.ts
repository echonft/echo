import { getAllOffers } from '@echo/firestore-test/offer/get-all-offers'
import { getAllOfferMocks } from '@echo/model-mocks/offer/get-all-offer-mocks'
import { contentEq } from '@echo/utils/fp/content-eq'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getAllOffers', () => {
  it('get all offers', async () => {
    const offerMocks = getAllOfferMocks()
    const offers = await getAllOffers()
    expect(contentEq(offers, offerMocks)).toBeTruthy()
  })
})
