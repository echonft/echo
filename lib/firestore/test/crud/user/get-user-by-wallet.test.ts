import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { walletDocumentMockCrew } from '@echo/firestore/mocks/wallet-document-mock'
import { VirtualMachine } from '@echo/model/constants/virtual-machine'
import { userMockCrew } from '@echo/model/mocks/user-mock'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import { addWallet } from '@echo/test/firestore/crud/wallet/add-wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - user - getUserByWallet', () => {
  let addedWalletId: Nullable<string>

  beforeEach(() => {
    addedWalletId = undefined
  })
  afterEach(async () => {
    if (!isNil(addedWalletId)) {
      await deleteWallet(addedWalletId)
    }
  })

  it('returns undefined if the wallet does not exist', async () => {
    const owner = await getUserByWallet({ address: '0xnotfound', vm: VirtualMachine.Evm })
    expect(owner).toBeUndefined()
  })
  it('returns the wallet owner if wallet exists', async () => {
    addedWalletId = await addWallet(walletDocumentMockCrew)
    const owner = await getUserByWallet(walletMockCrew)
    const user = await getUserByUsername(userMockCrew.username)
    expect(owner).toBeDefined()
    expect(user).toBeDefined()
    expect(owner).toStrictEqual(user)
  })
})
