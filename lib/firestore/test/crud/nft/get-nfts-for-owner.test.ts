import { getNftsForOwner } from '../../../src/crud/nft/get-nfts-for-owner'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { includes, map, prop } from 'ramda'

describe('CRUD - nft - getNftsForOwner', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('returns an empty array the user is not found', async () => {
    const result = await getNftsForOwner('not-found')
    expect(result).toEqual([])
  })

  it('returns the nfts of the user', async () => {
    const nfts = await getNftsForOwner('oE6yUEQBPn7PZ89yMjKn')
    expect(nfts.length).toEqual(4)
    const nftIds = map(prop('id'), nfts)
    expect(includes('8hHFadIrrooORfTOLkBg', nftIds)).toBeTruthy()
    expect(includes('QFjMRNChUAHNswkRADXh', nftIds)).toBeTruthy()
    expect(includes('iRZFKEujarikVjpiFAkE', nftIds)).toBeTruthy()
    expect(includes('XiDa6k2P7gxXCKSxn2wq', nftIds)).toBeTruthy()
  })
})
