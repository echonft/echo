import { getAuthUser } from '@echo/auth/get-auth-user'
import type { User } from '@echo/auth/types/user'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { getLogger } from '@echo/frontend/lib/helpers/get-logger'
import type { NextReturn } from '@echo/frontend/lib/types/next-return'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc, pipe } from 'ramda'

export function withUser<Args extends Record<'user', Nullable<User>>, Return extends NextReturn>(
  fn: (args: Args) => Return
) {
  return async function (args: Args): Promise<Return> {
    const logger = getLogger().child({ component: 'server-component', decorator: withUser.name })
    await initializeFirebase({ logger })
    const user = await getAuthUser()
    const fnArgs = pipe(assoc('user', user), assoc('logger', logger))(args) as Args
    return fn.call(fn, fnArgs)
  }
}
