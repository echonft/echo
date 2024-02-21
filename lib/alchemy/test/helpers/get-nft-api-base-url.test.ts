import { getNftApiBaseUrl } from '@echo/alchemy/helpers/get-nft-api-base-url'
import { describe, expect, it } from '@jest/globals'

describe('helpers - getNftApiBaseUrl', () => {
  it('returns proper value', () => {
    expect(getNftApiBaseUrl(1)).toEqual('https://eth-mainnet.g.alchemy.com/nft/v3/test/')
    expect(getNftApiBaseUrl(11155111)).toEqual('https://eth-sepolia.g.alchemy.com/nft/v3/test/')
  })
})
