import { getNftApiBaseUrl } from '@echo/alchemy/helpers/get-nft-api-base-url'
import { MAINNET_CHAIN_ID, SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chain-ids'
import { describe, expect, it } from '@jest/globals'

describe('helpers - getNftApiBaseUrl', () => {
  it('returns proper value', () => {
    expect(getNftApiBaseUrl(MAINNET_CHAIN_ID)).toEqual('https://eth-mainnet.g.alchemy.com/nft/v3/test/')
    expect(getNftApiBaseUrl(SEPOLIA_CHAIN_ID)).toEqual('https://eth-sepolia.g.alchemy.com/nft/v3/test/')
  })
})
