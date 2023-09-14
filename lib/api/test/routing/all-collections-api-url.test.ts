import { allCollectionsApiUrl } from '@echo/api/routing/all-collections-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - allCollectionsApiUrl', () => {
  test('returns proper URL', () => {
    expect(allCollectionsApiUrl()).toStrictEqual(new URL('https://test.com/collections'))
  })
})
