import { MessagesType } from '@lib/messages'
import { NextPage } from 'next'

export declare global {
  // get typings on translation keys
  interface IntlMessages extends MessagesType {}

  // TODO Maybe we should expand that config for access control
  type AuthEnabledComponentConfig = {
    authenticationEnabled: boolean
  }
  type PageWithAuth<Props = object, InitialProps = Props> = NextPage<Props, InitialProps> & AuthEnabledComponentConfig
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
