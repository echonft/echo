import { getCreateOfferUrl } from '../../src'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - getCreateOfferUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('returns proper URL', () => {
    expect(getCreateOfferUrl()).toStrictEqual(new URL('https://test.com/create/offer'))
  })
})
