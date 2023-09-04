import { removeWalletSchema } from '../../src/lib/server/validators/remove-wallet-schema'
import { getUserMockById } from '@echo/firestore'

describe('validators - removeWalletSchema', () => {
  const wallet = getUserMockById('oE6yUEQBPn7PZ89yMjKn').wallets[0]!
  it('wrong wallet fails validation', () => {
    expect(() => removeWalletSchema.parse({ wallet: { address: '', chainId: 1 } })).toThrow()
    expect(() => removeWalletSchema.parse({ wallet: { address: undefined, chainId: 1 } })).toThrow()
    expect(() => removeWalletSchema.parse({ wallet: {} })).toThrow()
  })
  it('valid request pass', () => {
    expect(removeWalletSchema.parse({ wallet })).toStrictEqual({ wallet })
  })
})
