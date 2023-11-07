import { type AuthUser } from '@echo/model/types/auth-user'

declare global {
  namespace NodeJS {
    interface Process {
      env: {
        VERCEL_URL: string
      }
    }
  }
}

declare module 'next-auth' {
  interface Session {
    user: AuthUser
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser extends AuthUser {}
}
