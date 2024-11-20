import { getAuthUser } from '@echo/backend/helpers/get-auth-user'
import { initializeFirestore } from '@echo/firestore/services/initialize-firestore'
import type { User } from '@echo/model/types/user'
import type { Awaitable } from '@echo/utils/types/awaitable'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import { assoc, isNil } from 'ramda'
import type { ReactElement } from 'react'

export function withLoggedInUser<
  Args extends Record<'user', User>,
  Return extends Nullable<Awaitable<void> | Awaitable<ReactElement>>
>(fn: (args: Args) => Return) {
  return async function (args: Args): Promise<Return> {
    await initializeFirestore()
    const user = await getAuthUser()
    if (isNil(user)) {
      return notFound()
    }
    const fnArgs = assoc('user', user, args) as Args
    return fn.call(fn, fnArgs)
  }
}
