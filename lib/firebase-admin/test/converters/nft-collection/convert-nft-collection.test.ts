import { getFirestoreNftCollectionData } from '../../../src/data/nft-collection/get-firestore-nft-collection-data'
import { nftCollectionFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('convertNftCollection', () => {
  it('correct conversion', async () => {
    const nftCollection = await getFirestoreNftCollectionData('Rc8pLQXxgyQGIRL0fr13')
    expect(nftCollection).toEqual(nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13'])
  })
})
