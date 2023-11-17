import { BASE_URL } from '@echo/frontend/lib/constants/base-url'
import { type AuthUser } from '@echo/model/types/auth-user'
import { redirect } from 'next/navigation'
import { type Session } from 'next-auth'
import { isNil } from 'ramda'

// TODO add sessionToken and check expiration
// We need to validate that it is automatically refreshed first though (although it should be)
export function redirectIfNotLoggedIn(
  session: Session | null,
  path: string
): asserts session is Omit<Session, 'user'> & Record<'user', AuthUser> {
  if (isNil(session) || isNil(session.user)) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(`${BASE_URL}${path}`)}`)
  }
}
