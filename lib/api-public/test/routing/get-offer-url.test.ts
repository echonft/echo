import { getOfferUrl } from '../../src'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - getOfferUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('returns proper URL', () => {
    expect(getOfferUrl('test')).toStrictEqual(new URL('https://test.com/offer/test'))
    expect(getOfferUrl('')).toStrictEqual(new URL('https://test.com/offer/'))
  })
})
