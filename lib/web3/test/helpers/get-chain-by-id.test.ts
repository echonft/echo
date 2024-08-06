import { ethereumChainId, sepoliaChainId } from '@echo/utils/helpers/chains/chain-ids'
import { getViemChainById } from '@echo/web3/helpers/get-viem-chain-by-id'
import { describe, expect, test } from '@jest/globals'

describe('helpers - getChainById', () => {
  test('returns a chain if id is valid', () => {
    expect(getViemChainById(ethereumChainId())).toBeDefined()
    expect(getViemChainById(sepoliaChainId())).toBeDefined()
  })

  test('throws if chain id is invalid', () => {
    expect(() => getViemChainById(2)).toThrow()
  })
})
