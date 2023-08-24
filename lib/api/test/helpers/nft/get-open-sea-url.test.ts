import { getOpenSeaUrl } from '../../../src/helpers/nft/get-open-sea-url'
import { describe, expect, it } from '@jest/globals'

describe('helpers - nft - getOpenSeaUrl', () => {
  it('returns the URL', () => {
    const contractAddress = '0x320e2fa93a4010ba47edcde762802374bac8d3f7'
    const chainId = 1
    const tokenId = 1376
    const openSeaUrl = getOpenSeaUrl(contractAddress, chainId, tokenId)
    expect(openSeaUrl).toEqual(new URL(`https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}`))
  })
})
