import { getCompletedOffersForCollection } from '@echo/firestore/crud/offer/get-completed-offers-for-collection'
import { COLLECTION_MOCK_PX_SLUG } from '@echo/model-mocks/collection/collection-mock'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OFFER_MOCK_FROM_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getCompletedOffersForCollection', () => {
  it('return an empty array if the collection does not exist', async () => {
    const documents = await getCompletedOffersForCollection('not-found')
    expect(documents).toEqual([])
  })
  it('returns the completed offers for which the collection is included in the receiver or sender items', async () => {
    const documents = await getCompletedOffersForCollection(COLLECTION_MOCK_PX_SLUG)
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById(OFFER_MOCK_FROM_JOHNNYCAGE_ID))
  })
})
