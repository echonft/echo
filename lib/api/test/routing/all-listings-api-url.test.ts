import { allListingsApiUrl } from '@echo/api/routing/all-listings-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - allListingsApiUrl', () => {
  test('returns proper URL', () => {
    expect(allListingsApiUrl()).toStrictEqual(new URL('https://echonft.xyz/api/listings'))
  })
})
