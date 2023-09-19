import { walletDocumentDataMock } from '@echo/firestore-mocks/wallet-document-data-mock'

export function getWalletDocumentDataMockById(id: string) {
  return walletDocumentDataMock[id]!
}
