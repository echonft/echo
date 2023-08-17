import { CollectionName } from '../../constants/collection-name'
import { userDataConverter } from '../../converters/user-data-converter'
import { walletDocumentDataConverter } from '../../converters/wallet-document-data-converter'
import { firestore } from '../../services/firestore'
import { Wallet } from '../../types/model/wallet'

export const findUserByWallet = async (wallet: Wallet) => {
  const walletDocumentData = walletDocumentDataConverter.toFirestore(wallet)
  const querySnapshot = await firestore()
    .collection(CollectionName.USERS)
    .where('wallets', 'array-contains', walletDocumentData)
    .withConverter(userDataConverter)
    .get()

  if (querySnapshot.empty) {
    return Promise.reject('user not found')
  }

  return querySnapshot.docs[0]!.data()
}
