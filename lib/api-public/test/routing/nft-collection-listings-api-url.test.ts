import { nftCollectionListingsApiUrl } from '../../src/routing/nft-collection-listings-api-url'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - nftCollectionListingsApiUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('throws if slug is empty', () => {
    expect(() => nftCollectionListingsApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(nftCollectionListingsApiUrl('test')).toStrictEqual(new URL('https://test.com/collection/test/listings'))
  })
})
