import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { getWalletDocumentDataMockById } from '@echo/firestore/mocks/wallet/get-wallet-document-data-mock-by-id'
import { walletMockJohnnyId } from '@echo/firestore/mocks/wallet/wallet-document-data-mock'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil, pick, toLower } from 'ramda'

describe('CRUD - wallet - removeWallet', () => {
  let deletedWalletId: Nullable<string>

  beforeEach(() => {
    deletedWalletId = undefined
  })
  afterEach(async () => {
    if (!isNil(deletedWalletId)) {
      await setReference({
        collectionReference: getWalletsCollectionReference(),
        data: getWalletDocumentDataMockById(deletedWalletId)
      })
    }
  })
  it('throws if the wallet does not exists', async () => {
    await expect(
      removeWallet(userMockJohnnyUsername(), {
        chain: 'ethereum',
        address: toLower('0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8')
      })
    ).rejects.toBeDefined()
  })
  it('throws if the user does not exists', async () => {
    await expect(
      removeWallet('not-found', {
        chain: 'ethereum',
        address: toLower('0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8')
      })
    ).rejects.toBeDefined()
  })
  it('throws if the wallet is not associated with the userId', async () => {
    await expect(
      removeWallet('6rECUMhevHfxABZ1VNOm', {
        chain: 'ethereum',
        address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E')
      })
    ).rejects.toBeDefined()
  })
  it('remove wallet', async () => {
    const walletId = walletMockJohnnyId()
    const wallet = getWalletDocumentDataMockById(walletId)
    const walletData = pick(['address', 'chain'], wallet)
    await removeWallet(userMockJohnnyUsername(), walletData)
    deletedWalletId = walletId
    const foundWallet = await getWalletByAddress(walletData)
    expect(foundWallet).toBeUndefined()
  })
})
