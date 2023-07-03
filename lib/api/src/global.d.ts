import { FirestoreUserData } from '@echo/firestore'

export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      NEXT_PUBLIC_API_URL: string
      NEXTAUTH_URL_INTERNAL: string
      NEXTAUTH_URL: string
      ADMIN_API_KEY: string
    }
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: FirestoreUserData
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user?: FirestoreUserData
  }
}
