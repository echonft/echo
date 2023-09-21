import { setUserId } from '@echo/firestore/crud/user/set-user-id'
import { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { complement, either, has } from 'ramda'

export async function setUserIdIfNeeded(user: FirestoreUser) {
  if (either(complement(has('id')), propIsNil('id'))(user)) {
    const id = await setUserId(user.name)
    return { ...user, id }
  }
  return user
}
