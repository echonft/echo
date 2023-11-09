import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { getAllWalletMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-mocks'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { getAllWallets } from '@echo/firestore-test/wallet/get-all-wallets'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('CRUD - wallet - getAllWallets', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('get all wallets', async () => {
    const walletMocks = getAllWalletMocks()
    const wallets = await getAllWallets()
    expect(wallets.length).toEqual(walletMocks.length)
    forEach((wallet: WalletDocumentData) => {
      expect(getWalletMockById(wallet.id)).toStrictEqual(wallet)
    }, wallets)
  })
})
