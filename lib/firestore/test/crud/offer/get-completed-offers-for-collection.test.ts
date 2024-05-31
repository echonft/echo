import { getCompletedOffersForCollection } from '@echo/firestore/crud/offer/get-completed-offers-for-collection'
import { collectionMockPxSlug } from '@echo/model-mocks/collection/collection-mock'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { offerMockFromJohnnycageId } from '@echo/model-mocks/offer/offer-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getCompletedOffersForCollection', () => {
  it('return an empty array if the collection does not exist', async () => {
    const documents = await getCompletedOffersForCollection('not-found')
    expect(documents).toEqual([])
  })
  it('returns the completed offers for which the collection is included in the receiver or sender items', async () => {
    const documents = await getCompletedOffersForCollection(collectionMockPxSlug())
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById(offerMockFromJohnnycageId()))
  })
})
