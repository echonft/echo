import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { offerMock } from '@echo/model-mocks/offer/offer-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - findOfferById', () => {
  it('returns undefined if the offer is not found', async () => {
    const offer = await findOfferById('not-found')
    expect(offer).toBeUndefined()
  })
  it('returns the offer with the given id', async () => {
    const offer = await findOfferById('LyCfl6Eg7JKuD7XJ6IPi')
    expect(offer).toStrictEqual(offerMock.LyCfl6Eg7JKuD7XJ6IPi)
  })
})
