// noinspection JSUnusedGlobalSymbols

import type { AuthUser } from '@echo/auth/types/auth-user'
import type { DefaultJWT, DefaultSession } from 'next-auth'
import '@echo/utils/global'

declare module 'next-auth' {
  interface User extends AuthUser {}

  interface JWT extends DefaultJWT {
    user?: AuthUser
  }

  interface Session extends DefaultSession {
    user?: AuthUser
  }
}

export {}
