import { nftCollectionApiUrl } from '../../src/routing/nft-collection-api-url'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - nftCollectionApiUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('throws if slug is empty', () => {
    expect(() => nftCollectionApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(nftCollectionApiUrl('test')).toStrictEqual(new URL('https://test.com/collection/test'))
  })
})
