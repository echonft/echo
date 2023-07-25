import { getAllNftCollections } from '../../../src/crud/nft-collection/get-all-nft-collections'
import { nftCollectionFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { R } from '@mobily/ts-belt'

describe('crud - nft-collection - getAllNftCollections', () => {
  it('retrieves all collections from Firestore', async () => {
    const result = await getAllNftCollections()
    expect(R.isError(result)).toBeFalsy()
    const data = R.getExn(result)
    expect(data.length).toEqual(2)
    expect(data[0]).toEqual(nftCollectionFirestoreData['1aomCtnoesD7WVll6Yi1'])
    expect(data[1]).toEqual(nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13'])
  })
})
