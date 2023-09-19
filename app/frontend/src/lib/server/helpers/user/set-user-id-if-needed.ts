import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { setUserId } from '@echo/firestore/crud/user/set-user-id'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { complement, either, has, isNil } from 'ramda'

export async function setUserIdIfNeeded(username: string) {
  const user = await findUserByUsername(username)
  if (isNil(user)) {
    throw Error(`user with username ${username} does not exist`)
  }
  if (either(complement(has('id')), propIsNil('id'))(user)) {
    return await setUserId(username)
  }
  return user.id
}
