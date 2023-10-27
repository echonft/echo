import { getViemChainById } from '@echo/api/services/viem/get-viem-chain-by-id'
import { describe, expect, test } from '@jest/globals'

describe('services - viewm - getViemChainById', () => {
  test('returns a chain if id is valid', () => {
    expect(getViemChainById(1)).toBeDefined()
    expect(getViemChainById(11155111)).toBeDefined()
  })

  test('throws if chain id is invalid', () => {
    expect(() => getViemChainById(2)).toThrow()
  })
})
