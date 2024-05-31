import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { getAuthUser } from '@echo/frontend/lib/auth/get-auth-user'
import type { NextReturn } from '@echo/frontend/lib/types/next-return'
import type { Nullable } from '@echo/utils/types/nullable'
import type { User } from 'next-auth'
import { assoc } from 'ramda'

export function withUser<Args extends Record<'user', Nullable<User>>, Return extends NextReturn>(
  fn: (args: Args) => Return
) {
  return async function (args: Args): Promise<Return> {
    initializeFirebase()
    const user = await getAuthUser()
    return fn.call(fn, assoc('user', user, args ?? {}) as Args)
  }
}
