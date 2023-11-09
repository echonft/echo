import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { type Collection } from '@echo/model/types/collection'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
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
