import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { walletDataConverter } from '@echo/firestore/converters/wallet/wallet-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getWalletsCollectionReference(): CollectionReference<WalletDocumentData, WalletDocumentData> {
  return firestoreApp()
    .collection(CollectionReferenceName.WALLETS)
    .withConverter<WalletDocumentData, WalletDocumentData>(walletDataConverter)
}
