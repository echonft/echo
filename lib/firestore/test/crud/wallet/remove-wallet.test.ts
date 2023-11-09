import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { findWalletByAddress } from '@echo/firestore/crud/wallet/find-wallet-by-address'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { assertWallets } from '@echo/firestore-test/wallet/assert-wallets'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { pick } from 'ramda'

describe('CRUD - wallet - removeWallet', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertWallets()
    await tearDownRemoteFirestoreTests()
  })

  it('throws if the wallet does not exists', async () => {
    await expect(
      removeWallet('6rECUMhevHfxABZ1VNOm', { chainId: 1, address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8' })
    ).rejects.toBeDefined()
  })

  it('throws if the wallet is not associated with the userId', async () => {
    await expect(
      removeWallet('6rECUMhevHfxABZ1VNOm', { chainId: 1, address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E' })
    ).rejects.toBeDefined()
  })

  it('remove wallet', async () => {
    const wallet = getWalletMockById('i28NWtlxElPXCnO0c6BC')
    const walletData = pick(['address', 'chainId'], wallet)
    await removeWallet(wallet.userId, walletData)
    const foundWallet = await findWalletByAddress(walletData)
    expect(foundWallet).toBeUndefined()
    const reference = firestoreApp().collection(CollectionReferenceName.WALLETS).doc(wallet.id)
    await reference.set(wallet)
  })
})
