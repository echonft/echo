import { walletDataConverter } from '@echo/firestore/converters/wallet-data-converter'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet-document-data'
import { VirtualMachine } from '@echo/model/constants/virtual-machine'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import { describe, expect, it } from '@jest/globals'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'

describe('converters - walletDataConverter', () => {
  const document = walletMockCrew
  const documentData: WalletDocumentData = {
    address: '0xf672715f2ba85794659a7150e8c21f8d157bfe1d',
    vm: VirtualMachine.Evm,
    userId: 'userId'
  }

  it('from Firestore conversion', () => {
    const snapshot = {
      id: 'walletId',
      exists: true,
      data: () => documentData
    } as unknown as QueryDocumentSnapshot<WalletDocumentData, WalletDocumentData>
    expect(walletDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('to Firestore conversion', () => {
    expect(walletDataConverter.toFirestore(document)).toStrictEqual(document)
  })

  it('to Firestore conversion - keeps userId when we pass it', () => {
    expect(walletDataConverter.toFirestore(documentData)).toStrictEqual(documentData)
  })
})
