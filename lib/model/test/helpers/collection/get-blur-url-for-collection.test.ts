import { getBlurUrlForCollection } from '@echo/model/helpers/collection/get-blur-url-for-collection'
import { describe, expect, it } from '@jest/globals'

describe('helpers - collection - getBlurUrlForCollection', () => {
  it('returns the mainnet URL', () => {
    const chainId = 1
    const slug = 'slug'
    const url = getBlurUrlForCollection(chainId, slug)
    expect(url).toEqual(`https://blur.io/collection/${slug}`)
  })

  it('returns undefined for any other chain', () => {
    const chainId = 11155111
    const slug = 'slug'
    const url = getBlurUrlForCollection(chainId, slug)
    expect(url).toBeUndefined()
  })
})
