import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { type Collection } from '@echo/model/types/collection'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('CRUD - collection - getAllCollections', () => {
  it('returns all collections', async () => {
    const collectionMocks = getAllCollectionMocks()
    const collections = await getAllCollections()
    expect(collections.length).toEqual(collectionMocks.length)
    forEach((collection: Collection) => {
      expect(getCollectionMockById(collection.id)).toStrictEqual(collection)
    }, collections)
  })
})
