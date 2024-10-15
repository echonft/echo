import { removeWalletRequestSchema } from '@echo/api/validators/remove-wallet-request-schema'
import { getWalletMock } from '@echo/model/mocks/wallet/wallet-mock'
import { describe, expect, it } from '@jest/globals'

describe('validators - removeWalletRequestSchema', () => {
  it('wrong wallet fails validation', () => {
    expect(() => removeWalletRequestSchema.parse({ wallet: { address: '', chainId: 1 } })).toThrow()
    expect(() => removeWalletRequestSchema.parse({ wallet: { address: undefined, chainId: 1 } })).toThrow()
    expect(() => removeWalletRequestSchema.parse({ wallet: {} })).toThrow()
  })
  it('valid request pass', () => {
    const wallet = getWalletMock()
    expect(removeWalletRequestSchema.parse({ wallet })).toStrictEqual({ wallet })
  })
})
