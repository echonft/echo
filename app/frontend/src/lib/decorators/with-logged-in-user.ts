import { getAuthUser } from '@echo/auth/get-auth-user'
import type { User } from '@echo/auth/types/user'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { getLogger } from '@echo/frontend/lib/helpers/get-logger'
import { notFound } from 'next/navigation'
import { assoc, isNil, pipe } from 'ramda'
import type { ReactElement } from 'react'

export function withLoggedInUser<
  Args extends Record<'user', User>,
  Return extends Promise<void> | Promise<ReactElement>
>(fn: (args: Args) => Return) {
  return async function (args: Args): Promise<Return> {
    const logger = getLogger().child({ component: 'server-component', fn: 'render' })
    await initializeFirebase({ logger })
    const user = await getAuthUser()
    if (isNil(user)) {
      return notFound()
    }
    const fnArgs = pipe(assoc('user', user), assoc('logger', logger))(args) as Args
    return fn.call(fn, fnArgs)
  }
}
