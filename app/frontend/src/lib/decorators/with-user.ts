import { getAuthUser } from '@echo/backend/helpers/get-auth-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { NextReturn } from '@echo/frontend/lib/types/next-return'
import type { User } from '@echo/model/types/user'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { andThen, assoc, pipe } from 'ramda'

export function withUser<Args extends Record<'user', Nullable<User>>, Return extends NextReturn>(
  fn: (args: Args) => Return
) {
  return async function (args: Args): Promise<Return> {
    await initializeFirebase()
    const user = await pipe(getAuthUser, andThen(unlessNil(getUserByUsername)))()
    const fnArgs = assoc('user', user, args) as Args
    return fn.call(fn, fnArgs)
  }
}
