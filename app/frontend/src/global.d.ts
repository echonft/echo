// noinspection JSUnusedGlobalSymbols

import { type AuthUser } from '@echo/model/types/auth-user'
import type { DefaultJWT, DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User extends AuthUser {}

  interface JWT extends DefaultJWT {
    user: AuthUser
  }

  interface Session extends DefaultSession {
    user?: AuthUser
  }
}

declare module '@sentry/types' {
  interface User extends Pick<AuthUser, 'username'> {}
}
