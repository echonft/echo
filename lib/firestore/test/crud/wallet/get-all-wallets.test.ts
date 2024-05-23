import { getAllWalletDocumentDataMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-document-data-mocks'
import { getAllWallets } from '@echo/firestore-test/wallet/get-all-wallets'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - wallet - getAllWallets', () => {
  it('get all wallets', async () => {
    const walletMocks = getAllWalletDocumentDataMocks()
    const wallets = await getAllWallets()
    expect(eqListContent(wallets, walletMocks)).toBeTruthy()
  })
})
