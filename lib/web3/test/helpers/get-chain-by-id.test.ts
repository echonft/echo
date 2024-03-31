import { MAINNET_CHAIN_ID, SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chain-ids'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { describe, expect, test } from '@jest/globals'

describe('helpers - getChainById', () => {
  test('returns a chain if id is valid', () => {
    expect(getChainById(MAINNET_CHAIN_ID)).toBeDefined()
    expect(getChainById(SEPOLIA_CHAIN_ID)).toBeDefined()
  })

  test('throws if chain id is invalid', () => {
    expect(() => getChainById(2)).toThrow()
  })
})
