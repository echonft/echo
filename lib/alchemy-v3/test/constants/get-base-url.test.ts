import { getBaseUrl } from '../../src/constants/get-base-url'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../src/constants/get-alchemy-api-key')

describe('constants - getBaseUrl', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('returns proper value', () => {
    expect(getBaseUrl()).toEqual('https://eth-mainnet.g.alchemy.com/nft/v3/test/')
  })
})
