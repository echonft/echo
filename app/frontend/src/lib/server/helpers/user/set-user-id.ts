import { setUserId as firestoreSetUserId } from '@echo/firestore/crud/user/set-user-id'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { complement, either, has } from 'ramda'

export async function setUserId(user: AuthUser) {
  if (either(complement(has('id')), propIsNil('id'))(user)) {
    return await firestoreSetUserId(user.username)
  }
  return user.id
}
