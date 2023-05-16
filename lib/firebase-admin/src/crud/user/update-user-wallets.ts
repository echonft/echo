import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { CollectionName } from '@echo/firestore'
import { Wallet } from '@echo/model'
import { isNilOrEmpty } from '@echo/utils'
import { isNil } from 'ramda'

export const updateUserWallets = (userId: string, wallets: Wallet[]) => {
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
