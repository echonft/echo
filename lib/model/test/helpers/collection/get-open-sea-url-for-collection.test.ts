import { getOpenSeaUrlForCollection } from '@echo/model/helpers/collection/get-open-sea-url-for-collection'
import { describe, expect, it } from '@jest/globals'

describe('helpers - collection - getOpenSeaUrlForCollection', () => {
  it('returns the mainnet URL', () => {
    const chainId = 1
    const slug = 'slug'
    const url = getOpenSeaUrlForCollection(chainId, slug)
    expect(url).toEqual(`https://opensea.io/collection/${slug}`)
  })

  it('returns the sepolia URL', () => {
    const chainId = 11155111
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
