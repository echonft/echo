import { getUserUrl } from '../../src'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - getUserUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('returns proper URL', () => {
    expect(getUserUrl('test')).toStrictEqual(new URL('https://test.com/user/test'))
    expect(getUserUrl('')).toStrictEqual(new URL('https://test.com/user/'))
  })
})
