import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { getAllWalletMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-mocks'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { assertWallets } from '@echo/firestore-test/wallet/assert-wallets'
import { findWalletById } from '@echo/firestore-test/wallet/find-wallet-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { head, pick } from 'ramda'

describe('CRUD - wallet - addWallet', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertWallets()
    await tearDownRemoteFirestoreTests()
  })

  it('throws if the wallet already exists', async () => {
    const wallet = head(getAllWalletMocks())
    await expect(addWallet('userId', pick(['address', 'chainId'], wallet))).rejects.toBeDefined()
  })
  it('add wallet', async () => {
    const { id } = await addWallet('6rECUMhevHfxABZ1VNOm', {
      address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8',
      chainId: 1
    })
    const wallet = await findWalletById(id)
    expect(wallet?.id).toEqual(id)
    expect(wallet?.userId).toEqual('6rECUMhevHfxABZ1VNOm')
    expect(wallet?.chainId).toEqual(1)
    expect(wallet?.address).toEqual('0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8')
    await deleteWallet(id)
  })
})
