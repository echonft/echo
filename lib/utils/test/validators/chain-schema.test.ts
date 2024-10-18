import { Chain } from '@echo/utils/constants/chain'
import { chainSchema } from '@echo/utils/validators/chain-schema'
import { describe, expect, it } from '@jest/globals'

describe('validators - chainSchema', () => {
  it('wrong chain fails validation', () => {
    expect(() => chainSchema.parse('')).toThrow()
    expect(() => chainSchema.parse(undefined)).toThrow()
  })
  it('not a supported chain id throws', () => {
    expect(() => chainSchema.parse('other-chain')).toThrow()
  })
  it('supported chain passes', () => {
    expect(() => chainSchema.parse(Chain.Ethereum)).not.toThrow()
  })
})
