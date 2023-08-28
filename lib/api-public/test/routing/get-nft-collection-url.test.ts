import { getNftCollectionUrl } from '../../src'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - getNftCollectionUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('returns proper URL', () => {
    expect(getNftCollectionUrl('test')).toStrictEqual(new URL('https://test.com/collection/test'))
    expect(getNftCollectionUrl('')).toStrictEqual(new URL('https://test.com/collection/'))
  })
})
