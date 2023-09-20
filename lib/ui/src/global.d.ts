import { MessagesType } from '@echo/ui/types/messages'
import { AuthUser } from '@echo/ui/types/model/auth-user'

export declare global {
  // get typings on translation keys
  interface IntlMessages extends MessagesType {}

  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      STORYBOOK: undefined | 'true'
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
