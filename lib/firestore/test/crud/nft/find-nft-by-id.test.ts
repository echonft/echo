import { findNftById } from '../../../src/crud/nft/find-nft-by-id'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { nftMock } from '../../mocks/nft-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft - findNftById', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('returns undefined if the nft is not found', async () => {
    const nft = await findNftById('not-found')
    expect(nft).toBeUndefined()
  })

  it('returns the nft with the given id', async () => {
    const collection = await findNftById('8hHFadIrrooORfTOLkBg')
    expect(collection).toStrictEqual(nftMock['8hHFadIrrooORfTOLkBg'])
  })
})
