import { findWalletByAddress } from '@echo/firestore/crud/wallet/find-wallet-by-address'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { formatAddress } from '@echo/utils/helpers/format-address'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('crud - wallet', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the wallet is not found', async () => {
    const wallet = await findWalletByAddress({ chainId: 1, address: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7' })
    expect(wallet).toBeUndefined()
  })

  it('returns undefined if the wallet if it exists', async () => {
    const walletMock = getWalletMockById('i28NWtlxElPXCnO0c6BC')
    const wallet = await findWalletByAddress({
      chainId: walletMock.chainId,
      address: formatAddress(walletMock.address, walletMock.chainId)
    })
    expect(wallet).toStrictEqual(walletMock)
  })
})
