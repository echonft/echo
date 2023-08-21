import { removeWalletSchema } from '../../src/types/validators/remove-wallet'
import { users } from '@echo/ui'
import { describe, expect, it } from '@jest/globals'

describe('validators - removeWallet', () => {
  const wallet = users['oE6yUEQBPn7PZ89yMjKn']!.wallets![0]!
  it('wrong wallet fails validation', () => {
    expect(() => removeWalletSchema.parse({ wallet: { address: '', chainId: 1 } })).toThrow()
    expect(() => removeWalletSchema.parse({ wallet: [{ address: undefined, chainId: 1 }] })).toThrow()
    expect(() => removeWalletSchema.parse({ wallet: [] })).toThrow()
  })
  it('valid request pass', () => {
    expect(removeWalletSchema.parse({ wallet: [wallet] })).toStrictEqual({ wallet: [wallet] })
  })
})
