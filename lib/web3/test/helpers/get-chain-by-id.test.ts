import { Chain } from '@echo/utils/constants/chain'
import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import { getViemChainById } from '@echo/web3/helpers/get-viem-chain-by-id'
import { describe, expect, test } from '@jest/globals'

describe('helpers - getChainById', () => {
  test('returns a chain if id is valid', () => {
    expect(getViemChainById(getChainId(Chain.Ethereum))).toBeDefined()
    expect(getViemChainById(getChainId(Chain.Sepolia))).toBeDefined()
  })

  test('throws if chain id is invalid', () => {
    expect(() => getViemChainById(2)).toThrow()
  })
})
