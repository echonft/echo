import { offerApiUrl } from '../../src/routing/offer-api-url'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - offerApiUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('throws if id is empty', () => {
    expect(() => offerApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(offerApiUrl('test')).toStrictEqual(new URL('https://test.com/offer/test'))
  })
})
