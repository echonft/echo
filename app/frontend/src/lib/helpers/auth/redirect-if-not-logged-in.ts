import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type AuthUser } from '@echo/model/types/auth-user'
import { redirect } from 'next/navigation'
import { type Session } from 'next-auth'
import { stringify } from 'qs'
import { concat, isNil } from 'ramda'

// TODO add sessionToken and check expiration
// We need to validate that it is automatically refreshed first though (although it should be)
export function redirectIfNotLoggedIn(
  session: Session | null,
  callbackUrl: string
): asserts session is Omit<Session, 'user'> & Record<'user', AuthUser> {
  if (isNil(session) || isNil(session.user)) {
    const path = linkProvider.auth.signIn.get()
    const query = stringify({ callbackUrl }, { addQueryPrefix: true })
    redirect(concat(path, query))
  }
}
