import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { getWallet } from '@echo/firestore/crud/wallet/get-wallet'
import { walletDocumentMockCrew } from '@echo/firestore/mocks/wallet-document-mock'
import { walletMockCrew, walletMockJohnny } from '@echo/model/mocks/wallet-mock'
import { addWallet } from '@echo/test/firestore/crud/wallet/add-wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('getWallet', () => {
  let addedWalletId: Nullable<string>
  beforeEach(() => {
    addedWalletId = undefined
  })
  afterEach(async () => {
    if (!isNil(addedWalletId)) {
      await deleteWallet(addedWalletId)
    }
  })

  it('returns undefined if the wallet is not found', async () => {
    const wallet = await getWallet(walletMockJohnny)
    expect(wallet).toBeUndefined()
  })

  it('returns the wallet if it exists', async () => {
    addedWalletId = await addWallet(walletDocumentMockCrew)
    await expect(getWallet(walletMockCrew)).resolves.toStrictEqual(walletDocumentMockCrew)
  })
})
