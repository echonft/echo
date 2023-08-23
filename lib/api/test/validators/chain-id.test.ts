import { chainIdSchema } from '../../src/validators/chain-id-schema'
import { supportedChains } from '@echo/utils'
import { describe, expect, it } from '@jest/globals'

describe('validators - chainId', () => {
  it('wrong chainId fails validation', () => {
    expect(() => chainIdSchema.parse('')).toThrow()
    expect(() => chainIdSchema.parse(undefined)).toThrow()
    expect(() => chainIdSchema.parse(0)).toThrow()
  })
  it('valid chainId pass', () => {
    expect(chainIdSchema.parse(supportedChains[0])).toBe(1)
  })
})
