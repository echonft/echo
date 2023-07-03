import { removeWalletsSchema } from '../../src/types/validators/remove-wallets'
import { users } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('validators - removeWallet', () => {
  const wallet = users['oE6yUEQBPn7PZ89yMjKn']!.wallets![0]!
  it('wrong wallet fails validation', () => {
    expect(() => removeWalletsSchema.parse({ wallet: { address: '', chainId: 1 } })).toThrow()
    expect(() => removeWalletsSchema.parse({ wallet: [{ address: undefined, chainId: 1 }] })).toThrow()
    expect(() => removeWalletsSchema.parse({ wallet: [] })).toThrow()
  })
  it('valid request pass', () => {
    expect(removeWalletsSchema.parse({ wallet: [wallet] })).toStrictEqual({ wallet: [wallet] })
  })
})
