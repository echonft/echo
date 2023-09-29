import { walletDataConverter } from '@echo/firestore/converters/wallet/wallet-data-converter'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { walletSnapshotMock } from '@echo/firestore-mocks/wallet/wallet-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - walletDataConverter', () => {
  const wallet = getWalletMockById('i28NWtlxElPXCnO0c6BC')

  it('from Firestore conversion', () => {
    const walletSnapshot = walletSnapshotMock.i28NWtlxElPXCnO0c6BC!
    expect(walletDataConverter.fromFirestore(walletSnapshot)).toStrictEqual(wallet)
  })

  it('to Firestore conversion', () => {
    expect(walletDataConverter.toFirestore(wallet)).toStrictEqual(wallet)
  })
})
