import { nfts } from '../../src/mocks/nft'
import { nftEquals } from '../../src/predicates/nft/nft-equals'
import { Nft } from '../../src/types/nft'
import { describe, expect, it } from '@jest/globals'

describe('predicates - nft - nftEquals', () => {
  const nft1: Nft = nfts['QFjMRNChUAHNswkRADXh']!
  const nft2: Nft = nfts['8hHFadIrrooORfTOLkBg']!
  it('different nfts returns false', () => {
    expect(nftEquals(nft1)(nft2)).toBeFalsy()
    expect(nftEquals(nft2)(nft1)).toBeFalsy()
  })
  it('same NFT with different id returns false', () => {
    const nft1Different = { ...nft1, id: nft2.id }
    expect(nftEquals(nft1)(nft1Different)).toBeFalsy()
    expect(nftEquals(nft1Different)(nft1)).toBeFalsy()
  })
  it('same NFT returns true', () => {
    expect(nftEquals(nft1)(nft1)).toBeTruthy()
    expect(nftEquals(nft1)({ ...nft2, id: nft1.id })).toBeTruthy()
  })
})
