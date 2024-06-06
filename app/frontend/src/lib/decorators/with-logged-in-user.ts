import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { getAuthUser } from '@echo/frontend/lib/auth/get-auth-user'
import type { NextReturn } from '@echo/frontend/lib/types/next-return'
import type { User } from 'next-auth'
import { assoc, isNil } from 'ramda'

export function withLoggedInUser<Args extends Record<'user', User>, Return extends NextReturn>(
  fn: (args: Args) => Return
) {
  return async function (args: Args): Promise<Return> {
    initializeFirebase()
    const user = await getAuthUser()
    if (isNil(user)) {
      throw Error('Unauthorized')
    }
    return fn.call(fn, assoc('user', user, args) as Args)
  }
}
