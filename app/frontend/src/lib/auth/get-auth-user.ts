import { auth } from '@echo/frontend/lib/auth/auth'
import type { AuthUser } from '@echo/model/types/auth-user'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import type { Session } from 'next-auth'
import { andThen, pipe, prop } from 'ramda'

export function getAuthUser() {
  return pipe<[], Promise<Nullable<Session>>, Promise<Nullable<AuthUser>>>(auth, andThen(unlessNil(prop('user'))))()
}
