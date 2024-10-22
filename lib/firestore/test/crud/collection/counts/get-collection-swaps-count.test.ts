import { getCollectionSwapsCount } from '@echo/firestore/crud/collection/counts/get-collection-swaps-count'
import { collectionMockPxSlug } from '@echo/model/mocks/collection/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - counts - getCollectionSwapsCount', () => {
  it('returns 0 if there are no swaps for the collection', async () => {
    const count = await getCollectionSwapsCount('not-found')
    expect(count).toEqual(0)
  })

  it('returns the swaps count for the collection', async () => {
    const collectionSlug = collectionMockPxSlug()
    const count = await getCollectionSwapsCount(collectionSlug)
    expect(count).toEqual(1)
  })
})
