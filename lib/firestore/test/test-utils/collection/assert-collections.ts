import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { type Collection } from '@echo/model/types/collection'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertCollections() {
  const collectionMocks = getAllCollectionMocks()
  const collections = await getAllCollections()
  expect(collections.length).toEqual(collectionMocks.length)
  forEach((collection: Collection) => {
    expect(collection).toStrictEqual(getCollectionMockById(collection.id))
  }, collections)
}
