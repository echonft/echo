import { getNftCollectionByContract } from '../../../src/lib/server/helpers/nft-collection/get-nft-collection-by-contract'
import { getAllNftCollectionMocks, getNftCollectionMockById } from '@echo/firestore'

describe('helpers - nft-collection - getNftCollectionByContract', () => {
  it('returns undefined if no collection is found with the given address', () => {
    const collections = getAllNftCollectionMocks()
    expect(getNftCollectionByContract('not-found', 1, collections)).toBeUndefined()
  })
  it('returns undefined if no collection is found with the given chain id', () => {
    const collections = getAllNftCollectionMocks()
    expect(getNftCollectionByContract('0x12c63bbD266dB84e117356e664f3604055166CEc', 0, collections)).toBeUndefined()
  })
  it('returns the right collection with the right address and chain id', () => {
    const collections = getAllNftCollectionMocks()
    const collection = getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    expect(getNftCollectionByContract('0x12c63bbD266dB84e117356e664f3604055166CEc', 1, collections)).toStrictEqual(
      collection
    )
  })
})
