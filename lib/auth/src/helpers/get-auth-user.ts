import { auth } from '@echo/auth/auth'
import type { User } from '@echo/model/types/user'
import { isNil } from 'ramda'

export async function getAuthUser(): Promise<User | null> {
  const session = await auth()
  if (isNil(session) || isNil(session.user)) {
    return null
  }
  return session.user
}
