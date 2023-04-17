import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { Wallet } from '@echo/model'
import { isEmpty, isNil } from 'ramda'

export const updateUserWallets = (userId: string, wallets: Wallet[]) => {
  const userRef = getDocRefFromPath('users', userId)
  if (isNil(userRef)) {
    return Promise.reject('User not found')
  }
  if (isNil(wallets) || isEmpty(wallets)) {
    return Promise.resolve()
  }
  return userRef.update({
    wallets
  })
}
