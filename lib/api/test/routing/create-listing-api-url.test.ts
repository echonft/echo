import { createListingApiUrl } from '@echo/api/routing/create-listing-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - createListingApiUrl', () => {
  test('returns proper URL', () => {
    expect(createListingApiUrl()).toStrictEqual(new URL('https://test.com/listing'))
  })
})
