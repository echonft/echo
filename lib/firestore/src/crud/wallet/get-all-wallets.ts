import { CollectionName } from '@echo/firestore/constants/collection-name'
import { walletDataConverter } from '@echo/firestore/converters/wallet-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import { invoker, map } from 'ramda'

export async function getAllWallets() {
  const querySnapshot = await firestoreApp().collection(CollectionName.WALLETS).withConverter(walletDataConverter).get()
  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreWallet[]
}
