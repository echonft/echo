import { Chain } from '@echo/model/constants/chain'
import { chainSchema } from '@echo/model/validators/chain-schema'
import { describe, expect, it } from '@jest/globals'

describe('chainSchema', () => {
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
