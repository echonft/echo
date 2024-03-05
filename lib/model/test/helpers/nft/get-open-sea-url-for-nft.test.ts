import { getOpenSeaUrlForNft } from '@echo/model/helpers/nft/get-open-sea-url-for-nft'
import { MAINNET_CHAIN_ID, SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chain-ids'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('helpers - nft - getOpenSeaUrlForNft', () => {
  it('returns the mainnet URL', () => {
    const chainId = MAINNET_CHAIN_ID
    const address = toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7')
    const tokenId = 1376
    const tokenType = 'ERC721'
    const url = getOpenSeaUrlForNft({ address, chainId, tokenType }, tokenId)
    expect(url).toEqual(`https://opensea.io/assets/ethereum/${address}/${tokenId}`)
  })

  it('returns the sepolia URL', () => {
    const chainId = SEPOLIA_CHAIN_ID
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
