import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { getAllWalletMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-mocks'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { expect } from '@jest/globals'
import { getAllWallets } from '@test-utils/wallet/get-all-wallets'
import { forEach } from 'ramda'

export async function assertWallets() {
  const walletMocks = getAllWalletMocks()
  const wallets = await getAllWallets()
  expect(wallets.length).toEqual(walletMocks.length)
  forEach((wallet: WalletDocumentData) => {
    expect(wallet).toStrictEqual(getWalletMockById(wallet.id))
  }, wallets)
}
