import { allSwapsApiUrl } from '@echo/api/routing/all-swaps-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - allSwapsApiUrl', () => {
  test('returns proper URL', () => {
    expect(allSwapsApiUrl()).toStrictEqual(new URL('https://echonft.xyz/api/swaps'))
  })
})
