import { CollectionName } from '../../constants/collection-name'
import { getDocRefFromPath } from '../../helpers/document/get-doc-ref-from-path'
import { FirestoreWalletData } from '../../types/model/data/user/firestore-wallet-data'
import { isNilOrEmpty } from '@echo/utils'
import { isNil } from 'ramda'

export const updateUserWallets = (userId: string, wallets: FirestoreWalletData[]) => {
  const userRef = getDocRefFromPath(CollectionName.USERS, userId)
  if (isNil(userRef)) {
    return Promise.reject('User not found')
  }
  if (isNilOrEmpty(wallets)) {
    return Promise.resolve()
  }
  return userRef.update({
    wallets
  })
}
