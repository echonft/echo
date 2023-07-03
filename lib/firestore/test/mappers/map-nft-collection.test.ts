import { mapNftCollection } from '../../src/mappers/nft-collection/map-nft-collection'
import { nftCollectionFirestoreData } from '../../src/mocks/nft-collection-firestore-data'
import { nftCollections } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapNftCollection', () => {
  it('correct mapping', async () => {
    const nftCollection = await mapNftCollection(Promise.resolve(nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13']!))
    expect(nftCollection).toEqual(nftCollections['Rc8pLQXxgyQGIRL0fr13'])
  })
})
