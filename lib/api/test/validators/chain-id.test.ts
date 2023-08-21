import { chainId } from '../../src/types/validators/chain-id'
import { supportedChains } from '@echo/utils'
import { describe, expect, it } from '@jest/globals'

describe('validators - chainId', () => {
  it('wrong chainId fails validation', () => {
    expect(() => chainId.parse('')).toThrow()
    expect(() => chainId.parse(undefined)).toThrow()
    expect(() => chainId.parse(0)).toThrow()
  })
  it('valid chainId pass', () => {
    expect(chainId.parse(supportedChains[0])).toBe(1)
  })
})
