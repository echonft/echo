import type { AuthUser } from '@echo/model/types/auth-user'
import { baseUrl } from '@helpers/auth/base-url'
import { redirect } from 'next/navigation'
import type { Session } from 'next-auth'
import { isNil } from 'ramda' // TODO add sessionToken and check expiration

// TODO add sessionToken and check expiration
// We need to validate that it is automatically refreshed first though (although it should be)
export function redirectIfNotLoggedIn(
  session: Session | null,
  path: string
): asserts session is Session & Record<'user', AuthUser> {
  if (isNil(session) || isNil(session.user)) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(`${baseUrl()}${path}`)}`)
  }
}
