import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { CollectionName, FirestoreWalletData } from '@echo/firestore'
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
