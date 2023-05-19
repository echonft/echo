import { nftCollections } from '../../../mocks/src/nft-collection/nft-collection'
import { nftCollectionFirestoreData } from '../../../mocks/src/nft-collection/nft-collection-firestore-data'
import { mapNftCollection } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapNftCollection', () => {
  it('correct mapping', async () => {
    const nftCollection = await mapNftCollection(Promise.resolve(nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13']!))
    expect(nftCollection).toEqual(nftCollections['Rc8pLQXxgyQGIRL0fr13'])
  })
})
