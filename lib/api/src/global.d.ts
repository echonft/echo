import { AuthUser } from './types/auth/auth-user'

export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      NEXTAUTH_URL_INTERNAL: string
      NEXTAUTH_URL: string
      ADMIN_API_KEY: string
    }
  }
}

declare module 'next-auth' {
  interface Session {
    user: AuthUser
  }
}
