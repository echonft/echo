import { getNftsForCollection } from '../../../src/crud/nft/get-nfts-for-collection'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { includes, map, prop } from 'ramda'

describe('CRUD - nft - getNftsForCollection', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('returns an empty array the collection is not found', async () => {
    const result = await getNftsForCollection('not-found', 1)
    expect(result).toEqual([])
  })

  it('returns the nfts of the collection', async () => {
    const nfts = await getNftsForCollection('0x320e2fa93a4010ba47edcde762802374bac8d3f7', 1)
    expect(nfts.length).toEqual(3)
    const nftIds = map(prop('id'), nfts)
    expect(includes('8hHFadIrrooORfTOLkBg', nftIds)).toBeTruthy()
    expect(includes('iRZFKEujarikVjpiFAkE', nftIds)).toBeTruthy()
    expect(includes('5SeF1NSN5uPUxtWSr516', nftIds)).toBeTruthy()
  })
})
