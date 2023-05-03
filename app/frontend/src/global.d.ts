import { User } from '@echo/model'
import { MessagesType } from '@lib/messages'
import { NextPage } from 'next'

export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      NEXT_PUBLIC_CHAIN_ID: string | undefined
      NEXT_PUBLIC_MOCK: string | undefined
      // Alchemy
      // TODO move this to the API
      NEXT_PUBLIC_ALCHEMY_API_KEY_MAINNET: string
      NEXT_PUBLIC_ALCHEMY_API_KEY_GOERLI: string
    }
  }
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
    user: User
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user?: User
  }
}
