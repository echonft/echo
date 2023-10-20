import { chainIdSchema } from '@echo/frontend/lib/server/validators/chain-id-schema'
import { supportedChains } from '@echo/utils/constants/supported-chains'
import { forEach, includes } from 'ramda'

describe('validators - chainIdSchema', () => {
  it('wrong chainId fails validation', () => {
    expect(() => chainIdSchema.parse('')).toThrow()
    expect(() => chainIdSchema.parse(undefined)).toThrow()
  })
  it('valid chain id but not included in supported chain ids throw', () => {
    const invalidChainId = 999999999
    expect(includes(invalidChainId, supportedChains)).toBeFalsy()
    expect(() => chainIdSchema.parse(invalidChainId)).toThrow()
  })
  it('any chain id in the supported chains pass', () => {
    forEach((chainId: number) => {
      expect(chainIdSchema.parse(chainId)).toStrictEqual(chainId)
    }, supportedChains)
  })
})
