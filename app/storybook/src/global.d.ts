import { AuthUser } from '@echo/ui/types/model/auth-user'

export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      STORYBOOK_ALCHEMY_API_KEY: string
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
