import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { getAllCollectionMocks } from '@echo/firestore-mocks/collection/get-all-collection-mocks'
import { getCollectionMockById } from '@echo/firestore-mocks/collection/get-collection-mock-by-id'
import type { Collection } from '@echo/model/types/collection'
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
