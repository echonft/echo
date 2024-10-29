import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { getWallet } from '@echo/firestore/crud/wallet/get-wallet'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { walletDocumentMockCrew } from '@echo/firestore/mocks/wallet-document-mock'
import { WalletError } from '@echo/model/constants/errors/wallet-error'
import { walletMockCrew, walletMockJohnny } from '@echo/model/mocks/wallet-mock'
import { addWallet } from '@echo/test/firestore/crud/wallet/add-wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - wallet - removeWallet', () => {
  let addedWalletId: Nullable<string>
  beforeEach(() => {
    addedWalletId = undefined
  })
  afterEach(async () => {
    if (!isNil(addedWalletId)) {
      await deleteWallet(addedWalletId)
    }
  })

  it('throws if the wallet does not exists', async () => {
    await expect(removeWallet(walletMockJohnny)).rejects.toEqual(Error(WalletError.NotFound))
  })

  it('remove wallet', async () => {
    addedWalletId = await addWallet(walletDocumentMockCrew)
    await removeWallet(walletMockCrew)
    await expect(getWallet(walletMockCrew)).resolves.toBeUndefined()
  })
})
