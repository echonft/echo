import { getAllNftCollections } from '../../../src/crud/nft-collection/get-all-nft-collections'
import { NftCollection } from '../../../src/types/model/nft-collection'
import { getAllNftCollectionMocks } from '../../mocks/get-all-nft-collection-mocks'
import { getNftCollectionMockById } from '../../mocks/get-nft-collection-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { removeUndefinedProps } from '@echo/utils'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { forEach, pick } from 'ramda'

describe('CRUD - nft-collection - getAllNftCollections', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('without any constraint', async () => {
    const collectionMocks = getAllNftCollectionMocks()
    const collections = await getAllNftCollections()
    expect(collections.length).toEqual(collectionMocks.length)
    forEach((collection: NftCollection) => {
      expect(getNftCollectionMockById(collection.id)).toStrictEqual(collection)
    }, collections)
  })

  it('with constraints', async () => {
    const collectionMocks = getAllNftCollectionMocks()
    const collections = await getAllNftCollections({
      select: ['id', 'name']
    })
    expect(collections.length).toEqual(collectionMocks.length)
    forEach((collection: NftCollection) => {
      const mock = getNftCollectionMockById(collection.id)
      expect(pick(['id', 'name'], mock)).toStrictEqual(removeUndefinedProps(collection))
    }, collections)
  })
})
