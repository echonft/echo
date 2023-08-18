import { getNftsForOwner } from '../../../src/crud/nft/get-nfts-for-owner'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { nftMock } from '../../mocks/nft-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft - getNftsForOwner', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('returns an empty array the user is not found', async () => {
    const result = await getNftsForOwner('not-found')
    expect(result).toEqual([])
  })

  it('returns the nfts of the user', async () => {
    const nfts = await getNftsForOwner('oE6yUEQBPn7PZ89yMjKn')
    expect(nfts.length).toEqual(2)
    expect(nfts[0]).toStrictEqual(nftMock['8hHFadIrrooORfTOLkBg'])
    expect(nfts[1]).toStrictEqual(nftMock['QFjMRNChUAHNswkRADXh'])
  })
})
