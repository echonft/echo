import { getBlurUrlForCollection } from '@echo/model/helpers/collection/get-blur-url-for-collection'
import { ETHEREUM_CHAIN_ID, SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chains/chain-ids'
import { describe, expect, it } from '@jest/globals'

describe('helpers - collection - getBlurUrlForCollection', () => {
  it('returns the mainnet URL', () => {
    const chainId = ETHEREUM_CHAIN_ID
    const slug = 'slug'
    const url = getBlurUrlForCollection(chainId, slug)
    expect(url).toEqual(`https://blur.io/collection/${slug}`)
  })

  it('returns undefined for any other chain', () => {
    const chainId = SEPOLIA_CHAIN_ID
    const slug = 'slug'
    const url = getBlurUrlForCollection(chainId, slug)
    expect(url).toBeUndefined()
  })
})
