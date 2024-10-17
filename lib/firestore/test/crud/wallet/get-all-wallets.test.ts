import { getAllWallets } from '@echo/firestore/crud/wallet/get-all-wallets'
import { getAllWalletDocumentDataMocks } from '@echo/firestore/mocks/wallet/get-all-wallet-document-data-mocks'
import { eqList } from '@echo/utils/fp/eq-list'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - wallet - getAllWallets', () => {
  it('get all wallets', async () => {
    const walletMocks = getAllWalletDocumentDataMocks()
    const wallets = await getAllWallets()
    expect(eqList(wallets, walletMocks)).toBeTruthy()
  })
})
