import { getOpenSeaUrlForNft } from '@echo/model/helpers/nft/get-open-sea-url-for-nft'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('helpers - nft - getOpenSeaUrlForNft', () => {
  it('returns the mainnet URL', () => {
    const chainId = 1
    const address = toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7')
    const tokenId = 1376
    const tokenType = 'ERC721'
    const url = getOpenSeaUrlForNft({ address, chainId, tokenType }, tokenId)
    expect(url).toEqual(`https://opensea.io/assets/ethereum/${address}/${tokenId}`)
  })

  it('returns the sepolia URL', () => {
    const chainId = 11155111
    const address = toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7')
    const tokenId = 1376
    const tokenType = 'ERC721'
    const url = getOpenSeaUrlForNft({ address, chainId, tokenType }, tokenId)
    expect(url).toEqual(`https://testnets.opensea.io/assets/sepolia/${address}/${tokenId}`)
  })

  it('returns undefined for any other chain', () => {
    const chainId = 2
    const address = toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7')
    const tokenId = 1376
    const tokenType = 'ERC721'
    const url = getOpenSeaUrlForNft({ address, chainId, tokenType }, tokenId)
    expect(url).toBeUndefined()
  })
})
