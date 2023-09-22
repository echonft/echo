import { CollectionName } from '@echo/firestore/constants/collection-name'
import { walletDataConverter } from '@echo/firestore/converters/wallet/wallet-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function getWalletSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.WALLETS)
    .where('id', '==', id)
    .withConverter(walletDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  return head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreWallet>
}
