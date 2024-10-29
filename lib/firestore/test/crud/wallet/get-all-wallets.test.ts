import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { getAllWallets } from '@echo/firestore/crud/wallet/get-all-wallets'
import { walletDocumentMockCrew, walletDocumentMockJohnny } from '@echo/firestore/mocks/wallet-document-mock'
import { addWallet } from '@echo/test/firestore/crud/wallet/add-wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - wallet - getAllWallets', () => {
  let addedWalletIds: Nullable<string[]>

  beforeEach(() => {
    addedWalletIds = undefined
  })
  afterEach(async () => {
    if (!isNil(addedWalletIds)) {
      for (const walletId of addedWalletIds) {
        await deleteWallet(walletId)
      }
    }
  })

  it('get all wallets', async () => {
    const walletCrewId = await addWallet(walletDocumentMockCrew)
    addedWalletIds = [walletCrewId]
    const walletJohnnyId = await addWallet(walletDocumentMockJohnny)
    addedWalletIds.push(walletJohnnyId)
    const wallets = await getAllWallets()
    expect(wallets).toEqualList([walletDocumentMockCrew, walletDocumentMockJohnny])
  })
})
