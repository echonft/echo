import { getAllCollectionMocks, getCollectionMockById } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { findNftCollectionByContract } from '../../../src/helpers/nft-collection/find-nft-collection-by-contract'

describe('helpers - nft-collection - findNftCollectionByContract', () => {
  it('returns undefined if no collection is found with the given address', () => {
    const collections = getAllCollectionMocks()
    expect(findNftCollectionByContract('not-found', 1, collections)).toBeUndefined()
  })
  it('returns undefined if no collection is found with the given chain id', () => {
    const collections = getAllCollectionMocks()
    expect(findNftCollectionByContract('0x12c63bbD266dB84e117356e664f3604055166CEc', 0, collections)).toBeUndefined()
  })
  it('returns the right collection with the right address and chain id', () => {
    const collections = getAllCollectionMocks()
    const collection = getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    expect(findNftCollectionByContract('0x12c63bbD266dB84e117356e664f3604055166CEc', 1, collections)).toStrictEqual(
      collection
    )
  })
})
