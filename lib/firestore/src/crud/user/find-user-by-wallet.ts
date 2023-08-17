import { CollectionName } from '../../constants/collection-name'
import { userDataConverter } from '../../converters/user-data-converter'
import { firestore } from '../../services/firestore'
import { Wallet } from '../../types/model/wallet'

export const findUserByWallet = async (wallet: Wallet) => {
  // wallet DocumentData is the same as the model so we don't need to convert it
  const querySnapshot = await firestore()
    .collection(CollectionName.USERS)
    .where('wallets', 'array-contains', wallet)
    .withConverter(userDataConverter)
    .get()

  if (querySnapshot.empty) {
    return Promise.reject('user not found')
  }

  return querySnapshot.docs[0]!.data()
}
