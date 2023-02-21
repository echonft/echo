import { getFirestoreNftCollection } from '../../data/nft-collection/get-firestore-nft-collection'
import { nftCollections } from '../../utils/test/mocks/nft-collection/nft-collection'
import { mapNftCollection } from '@echo/firestore/dist/mappers/nft-collection'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('mapNftCollection', () => {
  it('correct mapping', async () => {
    const nftCollection = await pipe(getFirestoreNftCollection, mapNftCollection)('Rc8pLQXxgyQGIRL0fr13')
    expect(nftCollection).toEqual(nftCollections['Rc8pLQXxgyQGIRL0fr13'])
  })
})
