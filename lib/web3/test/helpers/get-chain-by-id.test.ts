import { ethereumChainId, sepoliaChainId } from '@echo/utils/helpers/chains/chain-ids'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { describe, expect, test } from '@jest/globals'

describe('helpers - getChainById', () => {
  test('returns a chain if id is valid', () => {
    expect(getChainById(ethereumChainId())).toBeDefined()
    expect(getChainById(sepoliaChainId())).toBeDefined()
  })

  test('throws if chain id is invalid', () => {
    expect(() => getChainById(2)).toThrow()
  })
})
