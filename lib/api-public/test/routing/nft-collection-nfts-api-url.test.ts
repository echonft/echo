import { nftCollectionNftsApiUrl } from '../../src/routing/nft-collection-nfts-api-url'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - nftCollectionNftsApiUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('throws if slug is empty', () => {
    expect(() => nftCollectionNftsApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(nftCollectionNftsApiUrl('test')).toStrictEqual(new URL('https://test.com/collection/test/listings'))
  })
})
