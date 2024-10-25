import { getCollectionOffersCount } from '@echo/firestore/crud/collection/counts/get-collection-offers-count'
import { collectionMockPxSlug } from '@echo/model/mocks/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - counts - getCollectionOffersCount', () => {
  it('returns 0 if there are no listings for the collection', async () => {
    const count = await getCollectionOffersCount('not-found')
    expect(count).toEqual(0)
  })

  it('returns the offer count for the collection', async () => {
    const collectionSlug = collectionMockPxSlug()
    const count = await getCollectionOffersCount(collectionSlug)
    expect(count).toEqual(2)
  })
})
