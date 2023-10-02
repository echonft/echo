import { mapWalletToWalletData } from '@echo/firestore/mappers/map-wallet-to-wallet-data'
import { getWalletMocksByUserId } from '@echo/firestore-mocks/wallet/get-wallet-mocks-by-user-id'
import { removeWalletSchema } from '@server/validators/remove-wallet-schema'
import { head, pipe } from 'ramda'

describe('validators - removeWalletSchema', () => {
  const wallet = pipe(getWalletMocksByUserId, head, mapWalletToWalletData)('oE6yUEQBPn7PZ89yMjKn')
  it('wrong wallet fails validation', () => {
    expect(() => removeWalletSchema.parse({ wallet: { address: '', chainId: 1 } })).toThrow()
    expect(() => removeWalletSchema.parse({ wallet: { address: undefined, chainId: 1 } })).toThrow()
    expect(() => removeWalletSchema.parse({ wallet: {} })).toThrow()
  })
  it('valid request pass', () => {
    expect(removeWalletSchema.parse({ wallet })).toStrictEqual({ wallet })
  })
})
