import { getNftsForCollection } from '../../../src/crud/nft/get-nfts-for-collection'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { nftMock } from '../../mocks/nft-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft - getNftsForCollection', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('returns an empty array the collection is not found', async () => {
    const result = await getNftsForCollection('not-found', 1)
    expect(result).toEqual([])
  })

  it('returns the nfts of the collection', async () => {
    const nfts = await getNftsForCollection('0x320e2fa93a4010ba47edcde762802374bac8d3f7', 1)
    expect(nfts.length).toEqual(1)
    expect(nfts[0]).toStrictEqual(nftMock['8hHFadIrrooORfTOLkBg'])
  })
})
