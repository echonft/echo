import { CollectionName } from '@echo/firestore/constants/collection-name'
import { walletDataConverter } from '@echo/firestore/converters/wallet-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head, isNil } from 'ramda'

export async function getWalletSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.WALLETS)
    .where('id', '==', id)
    .withConverter(walletDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreWallet>
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot
}
