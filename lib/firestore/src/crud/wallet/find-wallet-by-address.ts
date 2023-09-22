import { CollectionName } from '@echo/firestore/constants/collection-name'
import { walletDataConverter } from '@echo/firestore/converters/wallet/wallet-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function findWalletByAddress(wallet: WalletData) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.WALLETS)
    .where('address', '==', wallet.address)
    .where('chainId', '==', wallet.chainId)
    .withConverter(walletDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreWallet>
  return documentSnapshot.data()
}
