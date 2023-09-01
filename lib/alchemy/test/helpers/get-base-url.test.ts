import { getBaseUrl } from '../../src/helpers/get-base-url'
import { describe, expect, it } from '@jest/globals'

describe('helpers - getBaseUrl', () => {
  it('returns proper value', () => {
    expect(getBaseUrl()).toEqual('https://eth-mainnet.g.alchemy.com/nft/v3/test/')
  })
})
