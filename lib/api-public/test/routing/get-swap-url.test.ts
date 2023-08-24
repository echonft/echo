import { getSwapUrl } from '../../src'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - getSwapUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('returns proper URL', () => {
    expect(getSwapUrl('test')).toStrictEqual(new URL('https://test.com/swap/test'))
    expect(getSwapUrl('')).toStrictEqual(new URL('https://test.com/swap/'))
  })
})
