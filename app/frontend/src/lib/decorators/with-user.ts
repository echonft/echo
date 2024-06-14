import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { getAuthUser } from '@echo/frontend/lib/auth/get-auth-user'
import { getLogger } from '@echo/frontend/lib/helpers/get-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import type { User } from 'next-auth'
import { assoc, pipe } from 'ramda'
import type { ReactElement } from 'react'

export function withUser<
  Args extends Record<'user', Nullable<User>>,
  Return extends Promise<void> | Promise<ReactElement>
>(fn: (args: Args) => Return) {
  return async function (args: Args): Promise<Return> {
    const logger = getLogger().child({ component: 'server-component', fn: 'render' })
    await initializeFirebase({ logger })
    const user = await getAuthUser()
    const fnArgs = pipe(assoc('user', user), assoc('logger', logger))(args) as Args
    return fn.call(fn, fnArgs).then(async (result) => {
      await terminateFirestore(logger)
      return result
    }) as Return
  }
}
