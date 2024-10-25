import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { walletDataConverter } from '@echo/firestore/converters/wallet-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet-document-data'
import type { Wallet } from '@echo/model/types/wallet'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getWalletsCollectionReference(): CollectionReference<Wallet, WalletDocumentData> {
  return firestoreApp()
    .collection(CollectionReferenceName.Wallets)
    .withConverter<Wallet, WalletDocumentData>(walletDataConverter)
}
