import { getAllWalletDocumentDataMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-document-data-mocks'
import { getAllWallets } from '@echo/firestore-test/wallet/get-all-wallets'
import { contentEq } from '@echo/utils/fp/content-eq'
import { expect } from '@jest/globals'

export async function assertWallets() {
  const documents = await getAllWallets()
  expect(contentEq(documents, getAllWalletDocumentDataMocks())).toBeTruthy()
}
