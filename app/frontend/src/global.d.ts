import { MessagesType } from '@echo/ui'
import { AuthUser } from '@echo/ui-model'

export declare global {
  // get typings on translation keys
  interface IntlMessages extends MessagesType {}

  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
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
    user: AuthUser
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user?: AuthUser
  }
}
