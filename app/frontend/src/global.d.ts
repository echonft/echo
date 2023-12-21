import { type AuthUser } from '@echo/model/types/auth-user'

declare module 'next-auth' {
  interface Session {
    user: AuthUser
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser extends AuthUser {}
}
