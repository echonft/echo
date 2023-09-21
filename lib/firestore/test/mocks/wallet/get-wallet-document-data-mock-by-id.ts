import { walletDocumentDataMock } from '@echo/firestore-mocks/wallet/wallet-document-data-mock'

export function getWalletDocumentDataMockById(id: string) {
  return walletDocumentDataMock[id]!
}
