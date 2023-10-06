import { getAlchemyBaseUrl } from '@echo/alchemy/helpers/get-alchemy-base-url'
import { describe, expect, it } from '@jest/globals'

describe('helpers - getAlchemyBaseUrl', () => {
  it('returns proper value', () => {
    expect(getAlchemyBaseUrl(1)).toEqual('https://eth-mainnet.g.alchemy.com/nft/v3/test/')
    expect(getAlchemyBaseUrl(11155111)).toEqual('https://eth-sepolia.g.alchemy.com/nft/v3/test/')
  })
})
