import { findNftCollectionByAddress } from '@echo/firestore/crud/nft-collection/find-nft-collection-by-address'
import { nftCollectionMock } from '@echo/firestore-mocks/nft-collection-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - nft-collection - findNftCollectionByAddress', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('throws an error if the collection if the address is wrong', async () => {
    try {
      await findNftCollectionByAddress('not-found', 1)
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('returns undefined if the collection if the chain id is wrong', async () => {
    const collection = await findNftCollectionByAddress('0x12c63bbD266dB84e117356e664f3604055166CEc', 0)
    expect(collection).toBeUndefined()
  })

  it('returns the collection with the given contract address and chain id', async () => {
    const collection = await findNftCollectionByAddress('0x12c63bbD266dB84e117356e664f3604055166CEc', 1)
    expect(collection).toStrictEqual(nftCollectionMock['Rc8pLQXxgyQGIRL0fr13'])
  })
})
