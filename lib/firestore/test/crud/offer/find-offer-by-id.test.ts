import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - findOfferById', () => {
  it('returns undefined if the offer is not found', async () => {
    const offer = await getOfferById('not-found')
    expect(offer).toBeUndefined()
  })
  it('returns the offer with the given id', async () => {
    const offer = await getOfferById('LyCfl6Eg7JKuD7XJ6IPi')
    expect(offer).toStrictEqual(offerMockToJohnnycage)
  })
})
