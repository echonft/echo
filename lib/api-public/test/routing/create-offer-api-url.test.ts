import { createOfferApiUrl } from '../../src/routing/create-offer-api-url'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - createOfferApiUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('returns proper URL', () => {
    expect(createOfferApiUrl()).toStrictEqual(new URL('https://test.com/create/offer'))
  })
})
