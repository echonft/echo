import { getBlurUrlForCollection } from '@echo/model/helpers/collection/get-blur-url-for-collection'
import { ethereumChainId, sepoliaChainId } from '@echo/utils/helpers/chains/chain-ids'
import { describe, expect, it } from '@jest/globals'

describe('helpers - collection - getBlurUrlForCollection', () => {
  it('returns the mainnet URL', () => {
    const chainId = ethereumChainId()
    const slug = 'slug'
    const url = getBlurUrlForCollection(chainId, slug)
    expect(url).toEqual(`https://blur.io/collection/${slug}`)
  })

  it('returns undefined for any other chain', () => {
    const chainId = sepoliaChainId()
    const slug = 'slug'
    const url = getBlurUrlForCollection(chainId, slug)
    expect(url).toBeUndefined()
  })
})
