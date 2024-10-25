import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - getCollection', () => {
  it('returns undefined if the collection is not found', async () => {
    const collection = await getCollection('not-found')
    expect(collection).toBeUndefined()
  })
  it('returns the collection with the given slug', async () => {
    const collection = await getCollection(collectionMockPx.slug)
    expect(collection).toStrictEqual(collectionMockPx)
  })
})
