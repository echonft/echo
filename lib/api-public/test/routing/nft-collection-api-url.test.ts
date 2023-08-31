import { nftCollectionApiUrl } from '../../src/routing/nft-collection-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - nftCollectionApiUrl', () => {
  test('throws if slug is empty', () => {
    expect(() => nftCollectionApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(nftCollectionApiUrl('test')).toStrictEqual(new URL('https://test.com/collection/test'))
  })
})
