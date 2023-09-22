import { getWalletMockByUserId } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-user-id'
import { removeWalletSchema } from '@server/validators/remove-wallet-schema'
import { pick } from 'ramda'

describe('validators - removeWalletSchema', () => {
  const wallet = pick(['address', 'chainId'], getWalletMockByUserId('oE6yUEQBPn7PZ89yMjKn'))
  it('wrong wallet fails validation', () => {
    expect(() => removeWalletSchema.parse({ wallet: { address: '', chainId: 1 } })).toThrow()
    expect(() => removeWalletSchema.parse({ wallet: { address: undefined, chainId: 1 } })).toThrow()
    expect(() => removeWalletSchema.parse({ wallet: {} })).toThrow()
  })
  it('valid request pass', () => {
    expect(removeWalletSchema.parse({ wallet })).toStrictEqual({ wallet })
  })
})
