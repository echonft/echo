import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { walletMock } from '@echo/firestore-mocks/wallet/wallet-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllWalletMocks() {
  return Object.values(walletMock) as NonEmptyArray<WalletDocumentData>
}
