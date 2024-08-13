import { getCollectionListingsCount } from '@echo/firestore/crud/collection-with-counts/get-collection-listings-count'
import { collectionMockPxSlug } from '@echo/model/mocks/collection/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('getCollectionListingsCount', () => {
  it('returns 0 if there are no listings for the collection', async () => {
    const count = await getCollectionListingsCount('not-found')
    expect(count).toEqual(0)
  })
  it('returns the listing count for the collection', async () => {
    const collectionSlug = collectionMockPxSlug()
    const count = await getCollectionListingsCount(collectionSlug)
    expect(count).toEqual(1)
  })
})
