import { findNftByCollectionContract } from '../../../src/crud/nft/find-nft-by-collection-contract'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { nftMock } from '../../mocks/nft-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft - findNftByCollectionContract', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('throws an error if the collection is not found', async () => {
    try {
      await findNftByCollectionContract('not-found', 1, 1376)
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('throws an error if the token id is not found', async () => {
    try {
      await findNftByCollectionContract('0x320e2fa93a4010ba47edcde762802374bac8d3f7', 1, 1)
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('returns the nft with the given collection and token id', async () => {
    const collection = await findNftByCollectionContract('0x320e2fa93a4010ba47edcde762802374bac8d3f7', 1, 1376)
    expect(collection).toStrictEqual(nftMock['8hHFadIrrooORfTOLkBg'])
  })
})
