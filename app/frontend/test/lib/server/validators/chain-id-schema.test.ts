import { chainIdSchema } from '@echo/frontend/lib/validators/chain-id-schema'
import { getChain } from '@echo/web3/helpers/get-chain'
import { equals } from 'ramda'

describe('validators - chainIdSchema', () => {
  it('wrong chainId fails validation', () => {
    expect(() => chainIdSchema.parse('')).toThrow()
    expect(() => chainIdSchema.parse(undefined)).toThrow()
  })
  it('valid chain id but not the current chain id throws', () => {
    const invalidChainId = 999999999
    expect(equals(getChain().id, invalidChainId)).toBeFalsy()
    expect(() => chainIdSchema.parse(invalidChainId)).toThrow()
  })
  it('current chain id passes', () => {
    const chainId = getChain().id
    expect(chainIdSchema.parse(chainId)).toStrictEqual(chainId)
  })
})
