import { getNftCollectionListingsUrl } from '../../src'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - getNftCollectionListingsUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('returns proper URL', () => {
    expect(getNftCollectionListingsUrl('test')).toStrictEqual(new URL('https://test.com/collection/test/listings'))
    expect(getNftCollectionListingsUrl('')).toStrictEqual(new URL('https://test.com/collection//listings'))
  })
})
