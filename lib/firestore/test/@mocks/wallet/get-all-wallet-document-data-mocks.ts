import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { walletDocumentDataMock } from '@echo/firestore-mocks/wallet/wallet-document-data-mock'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllWalletDocumentDataMocks() {
  return Object.values(walletDocumentDataMock) as NonEmptyArray<WalletDocumentData>
}
