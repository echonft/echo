import { findNftById } from '../../../src/crud/nft/find-nft-by-id'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { nftMock } from '../../mocks/nft-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft - findNftById', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('throws an error if the nft is not found', async () => {
    try {
      await findNftById('not-found')
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('returns the nft with the given id', async () => {
    const collection = await findNftById('8hHFadIrrooORfTOLkBg')
    expect(collection).toStrictEqual(nftMock['8hHFadIrrooORfTOLkBg'])
  })
})
