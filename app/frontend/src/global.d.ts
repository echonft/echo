import { DefaultJWT } from '@auth/core/jwt'
import { DefaultSession } from '@auth/core/types'
import type { User as FirestoreUser } from '@echo/firestore/types/model/user/user'
import { type AuthUser } from '@echo/model/types/auth-user'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: AuthUser
  }
}

declare module '@auth/core/types' {
  interface User extends FirestoreUser {}
}

declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT {
    user: AuthUser
  }
}
