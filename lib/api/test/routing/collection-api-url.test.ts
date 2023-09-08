import { collectionApiUrl } from '../../src/routing/collection-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - collectionApiUrl', () => {
  test('throws if slug is empty', () => {
    expect(() => collectionApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(collectionApiUrl('test')).toStrictEqual(new URL('https://test.com/collection/test'))
  })
})
