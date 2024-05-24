import { chainSchema } from '@echo/frontend/lib/validators/chain-schema'
import { CHAIN_NAMES } from '@echo/utils/constants/chain-names'

describe('validators - chainSchema', () => {
  it('wrong chain fails validation', () => {
    expect(() => chainSchema.parse('')).toThrow()
    expect(() => chainSchema.parse(undefined)).toThrow()
  })
  it('not a supported chain id throws', () => {
    expect(() => chainSchema.parse('other-chain')).toThrow()
  })
  it('supported chain passes', () => {
    expect(() => chainSchema.parse(CHAIN_NAMES[0])).not.toThrow()
  })
})
