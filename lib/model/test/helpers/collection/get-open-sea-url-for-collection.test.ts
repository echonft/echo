import { getOpenSeaUrlForCollection } from '@echo/model/helpers/collection/get-open-sea-url-for-collection'
import { ETHEREUM_CHAIN_ID, SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chains/chain-ids'
import { describe, expect, it } from '@jest/globals'

describe('helpers - collection - getOpenSeaUrlForCollection', () => {
  it('returns the mainnet URL', () => {
    const chainId = ETHEREUM_CHAIN_ID
    const slug = 'slug'
    const url = getOpenSeaUrlForCollection(chainId, slug)
    expect(url).toEqual(`https://opensea.io/collection/${slug}`)
  })

  it('returns the sepolia URL', () => {
    const chainId = SEPOLIA_CHAIN_ID
    const slug = 'slug'
    const url = getOpenSeaUrlForCollection(chainId, slug)
    expect(url).toEqual(`https://testnets.opensea.io/collection/${slug}`)
  })

  it('returns undefined for any other chain', () => {
    const chainId = 2
    const slug = 'slug'
    const url = getOpenSeaUrlForCollection(chainId, slug)
    expect(url).toBeUndefined()
  })
})
