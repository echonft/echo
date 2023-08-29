import { listingApiUrl } from '../../src/routing/listing-api-url'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - listingApiUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('throws if id is empty', () => {
    expect(() => listingApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(listingApiUrl('test')).toStrictEqual(new URL('https://test.com/listing/test'))
  })
})
