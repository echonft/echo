import { getAllNftCollections } from '@echo/firestore/crud/nft-collection/get-all-nft-collections'
import { getAllNftCollectionMocks } from '@echo/firestore-mocks/nft-collection/get-all-nft-collection-mocks'
import { getNftCollectionMockById } from '@echo/firestore-mocks/nft-collection/get-nft-collection-mock-by-id'
import type { Collection } from '@echo/model/types/collection'
import { removeUndefinedProps } from '@echo/utils/fp/remove-undefined-props'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { forEach, pick } from 'ramda'

describe('CRUD - nft-collection - getAllNftCollections', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('without any constraint', async () => {
    const collectionMocks = getAllNftCollectionMocks()
    const collections = await getAllNftCollections()
    expect(collections.length).toEqual(collectionMocks.length)
    forEach((collection: Collection) => {
      expect(getNftCollectionMockById(collection.id)).toStrictEqual(collection)
    }, collections)
  })

  it('with constraints', async () => {
    const collectionMocks = getAllNftCollectionMocks()
    const collections = await getAllNftCollections({
      select: ['id', 'name']
    })
    expect(collections.length).toEqual(collectionMocks.length)
    forEach((collection: Collection) => {
      const mock = getNftCollectionMockById(collection.id)
      expect(pick(['id', 'name'], mock)).toStrictEqual(removeUndefinedProps(collection))
    }, collections)
  })
})
