import { getListingUrl } from '../../src'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - getListingUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('returns proper URL', () => {
    expect(getListingUrl('test')).toStrictEqual(new URL('https://test.com/listing/test'))
    expect(getListingUrl('')).toStrictEqual(new URL('https://test.com/listing/'))
  })
})
