import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { offerMocks } from '@echo/model/mocks/offer-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getAllOffers', () => {
  it('get all offers', async () => {
    const offers = await getAllOffers()
    expect(offers).toEqual(offerMocks)
  })
})
