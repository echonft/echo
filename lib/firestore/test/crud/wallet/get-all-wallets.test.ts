import { getAllWalletDocumentDataMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-document-data-mocks'
import { getAllWallets } from '@echo/firestore-test/wallet/get-all-wallets'
import { contentEq } from '@echo/utils/fp/content-eq'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - wallet - getAllWallets', () => {
  it('get all wallets', async () => {
    const walletMocks = getAllWalletDocumentDataMocks()
    const wallets = await getAllWallets()
    expect(contentEq(wallets, walletMocks)).toBeTruthy()
  })
})
