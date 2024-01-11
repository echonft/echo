import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type AuthUser } from '@echo/model/types/auth-user'
import { redirect } from 'next/navigation'
import { stringify } from 'qs'
import { concat, isNil } from 'ramda'

// TODO remove this and use the middleware instead
export function redirectIfNotLoggedIn(user: AuthUser | undefined, callbackUrl: string): asserts user is AuthUser {
  if (isNil(user)) {
    const path = linkProvider.auth.signIn.get()
    const query = stringify({ callbackUrl }, { addQueryPrefix: true })
    redirect(concat(path, query))
  }
}
