import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { getAllCollectionMocks } from '@echo/firestore-mocks/collection/get-all-collection-mocks'
import { getCollectionMockById } from '@echo/firestore-mocks/collection/get-collection-mock-by-id'
import type { Collection } from '@echo/model/types/collection'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { forEach, pick } from 'ramda'

describe('CRUD - collection - getAllCollections', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('without any constraint', async () => {
    const collectionMocks = getAllCollectionMocks()
    const collections = await getAllCollections()
    expect(collections.length).toEqual(collectionMocks.length)
    forEach((collection: Collection) => {
      expect(getCollectionMockById(collection.id)).toStrictEqual(collection)
    }, collections)
  })

  it('with constraints', async () => {
    const collectionMocks = getAllCollectionMocks()
    const collections = await getAllCollections({
      select: ['id', 'name']
    })
    expect(collections.length).toEqual(collectionMocks.length)
    forEach((collection: Collection) => {
      const mock = getCollectionMockById(collection.id)
      expect(pick(['id', 'name'], mock)).toStrictEqual(collection)
    }, collections)
  })
})
