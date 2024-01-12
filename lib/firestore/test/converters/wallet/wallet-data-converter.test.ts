import { walletDataConverter } from '@echo/firestore/converters/wallet/wallet-data-converter'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import type { Wallet } from '@echo/model/types/wallet'
import { describe, expect, it } from '@jest/globals'
import { DocumentReference, QueryDocumentSnapshot } from 'firebase-admin/firestore'

describe('converters - walletDataConverter', () => {
  const document = getWalletMockById('i28NWtlxElPXCnO0c6BC')

  it('from Firestore conversion', () => {
    const snapshot = {
      ref: {
        id: 'i28NWtlxElPXCnO0c6BC',
        path: 'wallets/i28NWtlxElPXCnO0c6BC'
      } as unknown as DocumentReference<Wallet>,
      id: 'i28NWtlxElPXCnO0c6BC',
      exists: true,
      data: () => document
    } as unknown as QueryDocumentSnapshot<Wallet>
    expect(walletDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('to Firestore conversion', () => {
    expect(walletDataConverter.toFirestore(document)).toStrictEqual(document)
  })
})
