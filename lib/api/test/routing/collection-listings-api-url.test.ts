import { collectionListingsApiUrl } from '@echo/api/routing/collection-listings-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - collectionListingsApiUrl', () => {
  test('throws if slug is empty', () => {
    expect(() => collectionListingsApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(collectionListingsApiUrl('test')).toStrictEqual(new URL('https://echonft.xyz/api/collection/test/listings'))
  })
})
