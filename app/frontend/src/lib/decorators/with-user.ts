import { getAuthUser } from '@echo/backend/helpers/get-auth-user'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { User } from '@echo/model/types/user'
import type { Awaitable } from '@echo/utils/types/awaitable'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc } from 'ramda'
import type { ReactElement } from 'react'

export function withUser<
  Args extends Record<'user', Nullable<User>>,
  Return extends Nullable<Awaitable<void> | Awaitable<ReactElement>>
>(fn: (args: Args) => Return) {
  return async function (args: Args): Promise<Return> {
    await initializeFirebase()
    const user = await getAuthUser()
    const fnArgs = assoc('user', user, args) as Args
    return fn.call(fn, fnArgs)
  }
}
