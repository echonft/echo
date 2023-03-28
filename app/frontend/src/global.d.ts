import { MessagesType } from '@lib/messages'
import { NextPage } from 'next'
import { DefaultSession } from 'next-auth'

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
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
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
    firebaseToken: string
    user: DefaultSession['user']
  }
}
