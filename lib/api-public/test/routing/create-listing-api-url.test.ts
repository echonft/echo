import { createListingApiUrl } from '../../src/routing/create-listing-api-url'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - createListingApiUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('returns proper URL', () => {
    expect(createListingApiUrl()).toStrictEqual(new URL('https://test.com/listing'))
  })
})
