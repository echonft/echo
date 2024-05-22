import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { getWalletDocumentDataMockByUserId } from '@echo/firestore-mocks/wallet/get-wallet-document-data-mock-by-user-id'
import { removeWalletSchema } from '@echo/frontend/lib/validators/remove-wallet-schema'
import type { Wallet } from '@echo/model/types/wallet'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { getChain } from '@echo/web3/helpers/get-chain'
import { assoc, head, pipe } from 'ramda'

describe('validators - removeWalletSchema', () => {
  const wallet = pipe<[string], NonEmptyArray<WalletDocumentData>, WalletDocumentData, WalletDocumentData, Wallet>(
    getWalletDocumentDataMockByUserId,
    head,
    assoc('chainId', getChain().id),
    mapWalletDocumentDataToWallet
  )('oE6yUEQBPn7PZ89yMjKn')
  it('wrong wallet fails validation', () => {
    expect(() => removeWalletSchema.parse({ wallet: { address: '', chainId: 1 } })).toThrow()
    expect(() => removeWalletSchema.parse({ wallet: { address: undefined, chainId: 1 } })).toThrow()
    expect(() => removeWalletSchema.parse({ wallet: {} })).toThrow()
  })
  it('valid request pass', () => {
    expect(removeWalletSchema.parse({ wallet })).toStrictEqual({ wallet })
  })
})
