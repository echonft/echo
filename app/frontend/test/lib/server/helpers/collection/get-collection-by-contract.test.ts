import { getAllNftCollectionMocks } from '@echo/firestore-mocks/get-all-nft-collection-mocks'
import { getNftCollectionMockById } from '@echo/firestore-mocks/get-nft-collection-mock-by-id'
import { getCollectionByContract } from '@server/helpers/collection/get-collection-by-contract'

describe('helpers - collection - getCollectionByContract', () => {
  it('returns undefined if no collection is found with the given address', () => {
    const collections = getAllNftCollectionMocks()
    expect(getCollectionByContract('not-found', 1, collections)).toBeUndefined()
  })
  it('returns undefined if no collection is found with the given chain id', () => {
    const collections = getAllNftCollectionMocks()
    expect(getCollectionByContract('0x12c63bbD266dB84e117356e664f3604055166CEc', 0, collections)).toBeUndefined()
  })
  it('returns the right collection with the right address and chain id', () => {
    const collections = getAllNftCollectionMocks()
    const collection = getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    expect(getCollectionByContract('0x12c63bbD266dB84e117356e664f3604055166CEc', 1, collections)).toStrictEqual(
      collection
    )
  })
})
