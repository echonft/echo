import { getUserOffersUrl } from '../../src/routing/get-user-offers-url'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - getUserOffersUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('returns proper URL', () => {
    expect(getUserOffersUrl()).toStrictEqual(new URL('https://test.com/user/offers'))
  })
})
