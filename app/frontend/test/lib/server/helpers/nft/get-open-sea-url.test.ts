import { getOpenSeaUrl } from '@server/helpers/nft/get-open-sea-url'

describe('helpers - nft - getOpenSeaUrl', () => {
  it('returns the URL', () => {
    const contractAddress = '0x320e2fa93A4010ba47edcdE762802374bac8d3F7'
    const chainId = 1
    const tokenId = 1376
    const openSeaUrl = getOpenSeaUrl(contractAddress, chainId, tokenId)
    expect(openSeaUrl).toEqual(new URL(`https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}`))
  })
})
