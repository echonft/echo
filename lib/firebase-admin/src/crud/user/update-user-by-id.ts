import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { FirestoreUser } from '@echo/firestore'
import { FieldValue } from '@google-cloud/firestore'
import { isEmpty, isNil } from 'ramda'

// TODO This needs to be updated
export const updateUserById = (userId: string, { wallets, ...update }: Partial<FirestoreUser>) => {
  const userRef = getDocRefFromPath('users', userId)
  if (isNil(userRef)) {
    return Promise.reject('User not found')
  }
  if (isNil(wallets) || isEmpty(wallets)) {
    return userRef.update({
      ...update
    })
  }
  return userRef.update({
    ...update,
    wallets: FieldValue.arrayUnion(...wallets)
  })
}
