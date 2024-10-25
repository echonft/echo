import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'

import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { getWalletById } from '@echo/firestore/crud/wallet/get-wallet-by-id'
import { userMockJohnnyId } from '@echo/firestore/mocks/db-model/user/user-document-data-mock'
import { Chain } from '@echo/model/constants/chain'
import { userMockCrew, userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import { addUser } from '@echo/test/firestore/crud/user/add-or-update-user'
import { deleteUser } from '@echo/test/firestore/crud/user/delete-user'
import { addWallet as testAddWallet } from '@echo/test/firestore/crud/wallet/add-wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, pick, pipe, toLower } from 'ramda'

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
    await expect(
      addWallet('not-found', { address: toLower('0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8'), chain: Chain.Ethereum })
    ).rejects.toBeDefined()
  })

  it('add wallet', async () => {
    addedUserId = await addUser(userMockCrew)
    // const data =
    const { id } = await addWallet(userMockJohnnyUsername(), {
      address,
      chain: Chain.Ethereum
    })
    addedWalletId = id
    const wallet = (await getWalletById(id))!
    expect(wallet.userId).toEqual(userMockJohnnyId())
    expect(wallet.chain).toEqual(Chain.Ethereum)
    expect(wallet.address).toEqual(address)
  })

  it('throws if the wallet already exists', async () => {
    const wallet = walletMockCrew
    addedWalletId = await testAddWallet(wallet)
    const otherEvmChainWallet = pipe(pick(['address', 'chain']), assoc('chain', Chain.Blast))(wallet)
    await expect(addWallet(userMockJohnnyUsername(), otherEvmChainWallet)).rejects.toBeDefined()
  })
})
