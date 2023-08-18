import { findNftCollectionByAddress } from '../../../src/crud/nft-collection/find-nft-collection-by-address'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { nftCollectionMock } from '../../mocks/nft-collection-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft-collection - findNftCollectionByAddress', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('throws an error if the collection if the address is wrong', async () => {
    try {
      await findNftCollectionByAddress('not-found', 1)
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('throws an error if the collection if the chain id is wrong', async () => {
    try {
      await findNftCollectionByAddress('0x12c63bbD266dB84e117356e664f3604055166CEc', 0)
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('returns the collection with the given contract address and chain id', async () => {
    const collection = await findNftCollectionByAddress('0x12c63bbD266dB84e117356e664f3604055166CEc', 1)
    expect(collection).toStrictEqual(nftCollectionMock['Rc8pLQXxgyQGIRL0fr13'])
  })
})
