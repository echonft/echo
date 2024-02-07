import { getBlurUrl } from '@echo/model/helpers/nft/get-blur-url'
import { describe, expect, it } from '@jest/globals'

describe('helpers - nft - getBlurUrl', () => {
  it('returns the URL', () => {
    const contractAddress = '0x320e2fa93A4010ba47edcdE762802374bac8d3F7'
    const tokenId = 1376
    const blurUrl = getBlurUrl(contractAddress, tokenId)
    expect(blurUrl).toEqual(`https://blur.io/asset/${contractAddress}/${tokenId}`)
  })
})
