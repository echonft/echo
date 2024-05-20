import { findCollection } from '@echo/firestore/crud/collection/find-collection'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - findCollectionBySlug', () => {
  it('returns undefined if the collection is not found', async () => {
    const collection = await findCollection('not-found')
    expect(collection).toBeUndefined()
  })
  it('returns the collection with the given slug', async () => {
    const collection = await findCollection('pxmythics-genesis')
    expect(collection).toStrictEqual(getCollectionMockById('Rc8pLQXxgyQGIRL0fr13'))
  })
})
