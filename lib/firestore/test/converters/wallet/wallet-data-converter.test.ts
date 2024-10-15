import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { walletDataConverter } from '@echo/firestore/converters/wallet/wallet-data-converter'
import { getWalletDocumentDataMockById } from '@echo/firestore/mocks/wallet/get-wallet-document-data-mock-by-id'
import { walletMockJohnnyId } from '@echo/firestore/mocks/wallet/wallet-document-data-mock'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { Wallet } from '@echo/model/types/wallet'
import { describe, expect, it } from '@jest/globals'
import { DocumentReference, QueryDocumentSnapshot } from 'firebase-admin/firestore'

describe('converters - walletDataConverter', () => {
  const id = walletMockJohnnyId()
  const document = getWalletDocumentDataMockById(id)

  it('from Firestore conversion', () => {
    const snapshot = {
      ref: {
        id,
        path: `${CollectionReferenceName.Wallets}/${id}`
      } as unknown as DocumentReference<Wallet, WalletDocumentData>,
      id,
      exists: true,
      data: () => document
    } as unknown as QueryDocumentSnapshot<Wallet, WalletDocumentData>
    expect(walletDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('to Firestore conversion', () => {
    expect(walletDataConverter.toFirestore(document)).toStrictEqual(document)
  })
})
