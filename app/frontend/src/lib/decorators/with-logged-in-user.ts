import { getAuthUser } from '@echo/backend/helpers/auth/get-auth-user'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { NextReturn } from '@echo/frontend/lib/types/next-return'
import type { User } from '@echo/model/types/user'
import { notFound } from 'next/navigation'
import { assoc, isNil } from 'ramda'

export function withLoggedInUser<Args extends Record<'user', User>, Return extends NextReturn>(
  fn: (args: Args) => Return
) {
  return async function (args: Args): Promise<Return> {
    await initializeFirebase()
    const user = await getAuthUser()
    if (isNil(user)) {
      return notFound()
    }
    const fnArgs = assoc('user', user, args) as Args
    return fn.call(fn, fnArgs)
  }
}
