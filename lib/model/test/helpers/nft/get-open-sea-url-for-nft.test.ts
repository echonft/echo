import { getOpenSeaUrlForNft } from '@echo/model/helpers/nft/get-open-sea-url-for-nft'
import { CHAIN_ETHEREUM, TESTNET_CHAIN_SEPOLIA } from '@echo/utils/constants/chain-names'
import type { ChainName } from '@echo/utils/types/chain-name'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('helpers - nft - getOpenSeaUrlForNft', () => {
  it('returns the mainnet URL', () => {
    const chain = CHAIN_ETHEREUM
    const address = toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7')
    const tokenId = 1376
    const url = getOpenSeaUrlForNft({ address, chain }, tokenId)
    expect(url).toEqual(`https://opensea.io/assets/ethereum/${address}/${tokenId}`)
  })

  it('returns the sepolia URL', () => {
    const chain = TESTNET_CHAIN_SEPOLIA
    const address = toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7')
    const tokenId = 1376
    const url = getOpenSeaUrlForNft({ address, chain }, tokenId)
    expect(url).toEqual(`https://testnets.opensea.io/assets/sepolia/${address}/${tokenId}`)
  })

  it('returns undefined for any other chain', () => {
    const chain = 'test' as ChainName
    const address = toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7')
    const tokenId = 1376
    const url = getOpenSeaUrlForNft({ address, chain }, tokenId)
    expect(url).toBeUndefined()
  })
})
