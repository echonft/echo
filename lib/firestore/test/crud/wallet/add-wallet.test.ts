import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'

import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { getWalletById } from '@echo/firestore/crud/wallet/get-wallet-by-id'
import { userDocumentMockCrew } from '@echo/firestore/mocks/user-document-mock'
import { walletDocumentMockCrew } from '@echo/firestore/mocks/wallet-document-mock'
import { UserError } from '@echo/model/constants/errors/user-error'
import { WalletError } from '@echo/model/constants/errors/wallet-error'
import { VirtualMachine } from '@echo/model/constants/virtual-machine'
import { collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import { deleteUser } from '@echo/test/firestore/crud/user/delete-user'
import { addWallet as testAddWallet } from '@echo/test/firestore/crud/wallet/add-wallet'
import { userDocumentMockJohnnyId } from '@echo/test/firestore/initialize-db'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - wallet - addWallet', () => {
  let addedUserId: Nullable<string>
  let addedWalletId: Nullable<string>
  beforeEach(() => {
    addedUserId = undefined
    addedWalletId = undefined
  })
  afterEach(async () => {
    if (!isNil(addedUserId)) {
      await deleteUser(addedUserId)
    }
    if (!isNil(addedWalletId)) {
      await deleteWallet(addedWalletId)
    }
  })

  it('throws if the user does not exists', async () => {
    await expect(addWallet('not-found', walletMockCrew)).rejects.toEqual(Error(UserError.NotFound))
  })

  it('add wallet', async () => {
    // TODO add user
    const { id } = await addWallet(userMockJohnny.username, {
      address: collectionMockSpiral.contract.address,
      vm: VirtualMachine.Evm
    })
    addedWalletId = id
    const wallet = (await getWalletById(id))!
    expect(wallet.userId).toEqual(userDocumentMockJohnnyId)
    expect(wallet.address).toEqual(collectionMockSpiral.contract.address)
    expect(wallet.vm).toEqual(VirtualMachine.Evm)
  })

  it('throws if the wallet already exists', async () => {
    addedWalletId = await testAddWallet(walletDocumentMockCrew)
    await expect(addWallet(userDocumentMockCrew.username, walletDocumentMockCrew)).rejects.toEqual(
      Error(WalletError.Exists)
    )
  })
})
