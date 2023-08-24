import { getAllNftCollections } from '../../../src/crud/nft-collection/get-all-nft-collections'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { nftCollectionMock } from '../../mocks/nft-collection-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft-collection - getAllNftCollections', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('get all users', async () => {
    const collections = await getAllNftCollections()
    expect(collections.length).toEqual(2)
    expect(collections[0]).toStrictEqual(nftCollectionMock['1aomCtnoesD7WVll6Yi1'])
    expect(collections[1]).toStrictEqual(nftCollectionMock['Rc8pLQXxgyQGIRL0fr13'])
  })
})
