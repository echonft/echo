import { findNftsByIds } from '../../../src/crud/nft/find-nfts-by-ids'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { nftMock } from '../../mocks/nft-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft - findNftsByIds', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('returns an empty array if no nfts are found', async () => {
    const result1 = await findNftsByIds(['not-found'])
    expect(result1).toEqual([])
    const result2 = await findNftsByIds(['not', 'found'])
    expect(result2).toEqual([])
  })

  it('returns the nfts with the given ids', async () => {
    const result = await findNftsByIds(['8hHFadIrrooORfTOLkBg'])
    expect(result.length).toEqual(1)
    expect(result[0]).toStrictEqual(nftMock['8hHFadIrrooORfTOLkBg'])
    const result2 = await findNftsByIds(['8hHFadIrrooORfTOLkBg', 'not-found'])
    expect(result2.length).toEqual(1)
    expect(result2[0]).toStrictEqual(nftMock['8hHFadIrrooORfTOLkBg'])
    const result3 = await findNftsByIds(['QFjMRNChUAHNswkRADXh', '8hHFadIrrooORfTOLkBg'])
    expect(result3.length).toEqual(2)
    expect(result3[0]).toStrictEqual(nftMock['8hHFadIrrooORfTOLkBg'])
    expect(result3[1]).toStrictEqual(nftMock['QFjMRNChUAHNswkRADXh'])
  })
})
