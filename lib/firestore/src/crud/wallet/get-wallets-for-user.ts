import { CollectionName } from '@echo/firestore/constants/collection-name'
import { walletDataConverter } from '@echo/firestore/converters/wallet/wallet-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { invoker, map } from 'ramda'

export async function getWalletsForUser(userId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.WALLETS)
    .where('userId', '==', userId)
    .withConverter(walletDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as FirestoreWallet[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreWallet[]
}
