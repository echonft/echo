import { getNftBlurUrl } from '@server/helpers/nft/get-nft-blur-url'

describe('helpers - nft - getNftBlurUrl', () => {
  it('returns the URL', () => {
    const contractAddress = '0x320e2fa93A4010ba47edcdE762802374bac8d3F7'
    const tokenId = 1376
    const blurUrl = getNftBlurUrl(contractAddress, tokenId)
    expect(blurUrl).toEqual(new URL(`https://blur.io/asset/${contractAddress}/${tokenId}`))
  })
})
