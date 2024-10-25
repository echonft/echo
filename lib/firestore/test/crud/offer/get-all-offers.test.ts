import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { offerDocumentMocks } from '@echo/test/firestore/initialize-db'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getAllOffers', () => {
  it('get all offers', async () => {
    const offers = await getAllOffers()
    expect(offers).toEqualList(offerDocumentMocks)
  })
})
