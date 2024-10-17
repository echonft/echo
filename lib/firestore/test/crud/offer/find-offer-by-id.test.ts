import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('CRUD - offer - findOfferById', () => {
  it('returns undefined if the offer is not found', async () => {
    const offer = await getOfferById('not-found')
    expect(offer).toBeUndefined()
  })
  it('returns the offer with the given id', async () => {
    const offer = await pipe(offerMockToJohnnycageId, getOfferById)()
    expect(offer).toStrictEqual(pipe(offerMockToJohnnycageId, getOfferMockById)())
  })
})
