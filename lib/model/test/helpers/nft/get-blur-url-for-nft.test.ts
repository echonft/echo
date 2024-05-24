import { getBlurUrlForNft } from '@echo/model/helpers/nft/get-blur-url-for-nft'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('helpers - nft - getBlurUrlForNft', () => {
  it('returns the mainnet URL', () => {
    const chain = 'ethereum'
    const address = toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7')
    const tokenId = 1376
    const url = getBlurUrlForNft({ address, chain }, tokenId)
    expect(url).toEqual(`https://blur.io/eth/asset/${address}/${tokenId}`)
  })

  it('returns undefined for any other chain', () => {
    const chain = 'sepolia'
    const address = toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7')
    const tokenId = 1376
    const url = getBlurUrlForNft({ address, chain }, tokenId)
    expect(url).toBeUndefined()
  })
})
