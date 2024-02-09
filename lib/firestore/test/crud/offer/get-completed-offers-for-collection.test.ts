import { getCompletedOffersForCollection } from '@echo/firestore/crud/offer/get-completed-offers-for-collection'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getCompletedOffersForCollection', () => {
  it('return an empty array if the collection does not exist', async () => {
    const documents = await getCompletedOffersForCollection('not-found')
    expect(documents).toEqual([])
  })
  it('returns the completed offers for which the collection is included in the receiver or sender items', async () => {
    const documents = await getCompletedOffersForCollection('pxmythics-genesis')
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById('ASkFpKoHEHVH0gd69t1G'))
  })
})
