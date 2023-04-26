import { User } from '@echo/model'

export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      NEXT_PUBLIC_API_URL: string
      NEXTAUTH_URL_INTERNAL: string
      NEXTAUTH_URL: string
    }
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user?: User
  }
}
