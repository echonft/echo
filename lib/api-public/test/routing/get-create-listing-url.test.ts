import { getCreateListingUrl } from '../../src'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - getCreateListingUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('returns proper URL', () => {
    expect(getCreateListingUrl()).toStrictEqual(new URL('https://test.com/create/listing'))
  })
})
