import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { getAllWalletMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-mocks'
import { assertWallets } from '@echo/firestore-test/wallet/assert-wallets'
import { findWalletById } from '@echo/firestore-test/wallet/find-wallet-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { head, pick, toLower } from 'ramda'

describe('CRUD - wallet - addWallet', () => {
  beforeAll(async () => {
    await assertWallets()
  })
  afterAll(async () => {
    await assertWallets()
  })
  it('returns the wallet if it already exists', async () => {
    const wallet = head(getAllWalletMocks())
    const addedWallet = await addWallet('userId', pick(['address', 'chainId'], wallet))
    expect(addedWallet).toStrictEqual(wallet)
  })
  it('add wallet', async () => {
    const address = toLower('0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8')
    const { id } = await addWallet('6rECUMhevHfxABZ1VNOm', {
      address,
      chainId: 1
    })
    const wallet = await findWalletById(id)
    expect(wallet?.id).toEqual(id)
    expect(wallet?.userId).toEqual('6rECUMhevHfxABZ1VNOm')
    expect(wallet?.chainId).toEqual(1)
    expect(wallet?.address).toEqual(address)
    await deleteWallet(id)
  })
})
