import { getAllWallets } from '@echo/firestore/crud/wallet/get-all-wallets'
import { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { getAllWalletMocks } from '@echo/firestore-mocks/get-all-wallet-mocks'
import { getWalletMockById } from '@echo/firestore-mocks/get-wallet-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertWallets() {
  const walletMocks = getAllWalletMocks()
  const wallets = await getAllWallets()
  expect(wallets.length).toEqual(walletMocks.length)
  forEach((wallet: FirestoreWallet) => {
    expect(getWalletMockById(wallet.id)).toStrictEqual(wallet)
  }, wallets)
}
