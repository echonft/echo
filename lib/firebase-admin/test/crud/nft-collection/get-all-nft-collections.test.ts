import { getAllNftCollections } from '../../../src/crud/nft-collection/get-all-nft-collections'
import { nftCollectionFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('crud - nft-collection - getAllNftCollections', () => {
  it('retrieves all collections from Firestore', async () => {
    const collections = await getAllNftCollections()
    expect(collections.length).toEqual(2)
    expect(collections[0]).toEqual(nftCollectionFirestoreData['1aomCtnoesD7WVll6Yi1'])
    expect(collections[1]).toEqual(nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13'])
  })
})
