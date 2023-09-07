import { nftListingsApiUrl } from '../../src/routing/nft-listings-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - nftListingsApiUrl', () => {
  test('throws if nft id is empty', () => {
    expect(() => nftListingsApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(nftListingsApiUrl('test')).toStrictEqual(new URL('https://test.com/nft/test/listings'))
  })
})
