import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { getAllWalletMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-mocks'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { getAllWallets } from '@echo/firestore-test/wallet/get-all-wallets'
import { describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('CRUD - wallet - getAllWallets', () => {
  it('get all wallets', async () => {
    const walletMocks = getAllWalletMocks()
    const wallets = await getAllWallets()
    expect(wallets.length).toEqual(walletMocks.length)
    forEach((wallet: WalletDocumentData) => {
      expect(getWalletMockById(wallet.id)).toStrictEqual(wallet)
    }, wallets)
  })
})
