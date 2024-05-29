import { getBlurUrlForNft } from '@echo/model/helpers/nft/get-blur-url-for-nft'
import { CHAIN_ETHEREUM, TESTNET_CHAIN_SEPOLIA } from '@echo/utils/constants/chains/chains'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('helpers - nft - getBlurUrlForNft', () => {
  it('returns the mainnet URL', () => {
    const chain = CHAIN_ETHEREUM
    const address = toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7')
    const tokenId = 1376
    const url = getBlurUrlForNft({ address, chain }, tokenId)
    expect(url).toEqual(`https://blur.io/eth/asset/${address}/${tokenId}`)
  })

  it('returns undefined for any other chain', () => {
    const chain = TESTNET_CHAIN_SEPOLIA
    const address = toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7')
    const tokenId = 1376
    const url = getBlurUrlForNft({ address, chain }, tokenId)
    expect(url).toBeUndefined()
  })
})
