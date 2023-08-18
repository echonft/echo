import { findNftCollectionBySlug } from '../../../src/crud/nft-collection/find-nft-collection-by-slug'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { nftCollectionMock } from '../../mocks/nft-collection-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft-collection - findNftCollectionBySlug', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('throws an error if the collection is not found', async () => {
    try {
      await findNftCollectionBySlug('not-found')
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('returns the collection with the given slug', async () => {
    const collection = await findNftCollectionBySlug('pxmythics-genesis')
    expect(collection).toStrictEqual(nftCollectionMock['Rc8pLQXxgyQGIRL0fr13'])
  })
})
