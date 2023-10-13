import type { AuthUser } from '@echo/model/types/auth-user'
import { MessagesType } from '@echo/ui/types/messages'

export declare global {
  // get typings on translation keys
  interface IntlMessages extends MessagesType {}

  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      STORYBOOK: undefined | 'true'
      NEXT_PUBLIC_CHAIN_ID: string
      NEXT_PUBLIC_ALCHEMY_ID: undefined | string
      NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: undefined | string
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
