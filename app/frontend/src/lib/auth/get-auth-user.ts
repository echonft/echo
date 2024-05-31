import type { Session } from '@auth/core/types'
import { auth } from '@echo/frontend/lib/auth/auth'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import type { User } from 'next-auth'
import { andThen, pipe, prop } from 'ramda'

export async function getAuthUser() {
  return pipe<[], Promise<Nullable<Session>>, Promise<Nullable<User>>>(auth, andThen(unlessNil(prop('user'))))()
}
