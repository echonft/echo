import { getAuthUser } from '@echo/auth/helpers/get-auth-user'
import type { User } from '@echo/auth/types/user'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { NextReturn } from '@echo/frontend/lib/types/next-return'
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
