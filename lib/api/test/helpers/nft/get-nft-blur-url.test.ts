import { getNftBlurUrl } from '../../../src/helpers/nft/get-nft-blur-url'
import { describe, expect, it } from '@jest/globals'

describe('helpers - nft - getNftBlurUrl', () => {
  it('returns the URL', () => {
    const contractAddress = '0x320e2fa93a4010ba47edcde762802374bac8d3f7'
    const tokenId = 1376
    const blurUrl = getNftBlurUrl(contractAddress, tokenId)
    expect(blurUrl).toEqual(new URL(`https://blur.io/asset/${contractAddress}/${tokenId}`))
  })
})
