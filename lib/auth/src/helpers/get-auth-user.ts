import { auth } from '@echo/auth/auth'
import type { AuthUser } from '@echo/auth/types/auth-user'
import { isNil } from 'ramda'

export async function getAuthUser(): Promise<AuthUser | null> {
  const session = await auth()
  if (isNil(session) || isNil(session.user)) {
    return null
  }
  return session.user
}
