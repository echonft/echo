import { nftApiUrl } from '@echo/api/routing/nft-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - nftApiUrl', () => {
  test('throws if slug is empty', () => {
    expect(() => nftApiUrl('', '1')).toThrow()
  })

  test('throws if token id is empty', () => {
    expect(() => nftApiUrl('collection-slug', '')).toThrow()
  })

  test('returns proper URL', () => {
    expect(nftApiUrl('test', '11')).toStrictEqual(new URL('https://test.com/collection/test/item/11'))
  })
})
