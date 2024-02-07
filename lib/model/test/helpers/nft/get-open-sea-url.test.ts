import { getOpenSeaUrl } from '@echo/model/helpers/nft/get-open-sea-url'
import { describe, expect, it } from '@jest/globals'

describe('helpers - nft - getOpenSeaUrl', () => {
  it('returns the URL', () => {
    const contractAddress = '0x320e2fa93A4010ba47edcdE762802374bac8d3F7'
    const tokenId = 1376
    const openSeaUrl = getOpenSeaUrl(contractAddress, tokenId)
    expect(openSeaUrl).toEqual(`https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}`)
  })
})
