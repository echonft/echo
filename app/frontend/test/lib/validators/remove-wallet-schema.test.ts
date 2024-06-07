import { removeWalletSchema } from '@echo/frontend/lib/validators/remove-wallet-schema'
import { getWalletMock } from '@echo/model/mocks/wallet/wallet-mock'

describe('validators - removeWalletSchema', () => {
  it('wrong wallet fails validation', () => {
    expect(() => removeWalletSchema.parse({ wallet: { address: '', chainId: 1 } })).toThrow()
    expect(() => removeWalletSchema.parse({ wallet: { address: undefined, chainId: 1 } })).toThrow()
    expect(() => removeWalletSchema.parse({ wallet: {} })).toThrow()
  })
  it('valid request pass', () => {
    const wallet = getWalletMock()
    expect(removeWalletSchema.parse({ wallet })).toStrictEqual({ wallet })
  })
})
