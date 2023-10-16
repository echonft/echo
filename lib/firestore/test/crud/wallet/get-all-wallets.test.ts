import { getAllWallets } from '@echo/firestore/crud/wallet/get-all-wallets'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { getAllWalletMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-mocks'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
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
