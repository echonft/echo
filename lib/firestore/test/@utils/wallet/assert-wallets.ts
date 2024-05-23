import { getAllWalletDocumentDataMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-document-data-mocks'
import { getAllWallets } from '@echo/firestore-test/wallet/get-all-wallets'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { expect } from '@jest/globals'

export async function assertWallets() {
  const documents = await getAllWallets()
  expect(eqListContent(documents, getAllWalletDocumentDataMocks())).toBeTruthy()
}
