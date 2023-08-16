import { findNftCollectionBySlug } from '../../../src/crud/nft-collection/find-nft-collection-by-slug'
import { nftCollectionFirestoreData } from '../../mocks/nft-collection/nft-collection-firestore-data'
import { describe, expect, it } from '@jest/globals'

describe('crud - nft-collection - findNftCollectionBySlug', () => {
  it('wrong slug returns error', async () => {
    try {
      await findNftCollectionBySlug('not-found')
    } catch (error) {
      expect(error).toMatch('nft collection not found')
    }
  })
  it('right slug returns proper nft collection', async () => {
    const nftCollection = await findNftCollectionBySlug('pxmythics-genesis')
    expect(nftCollection).toEqual(nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13']!)
  })
})
