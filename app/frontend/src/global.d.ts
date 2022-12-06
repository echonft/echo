import { MessagesType } from '@lib/messages'

export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      NEXT_PUBLIC_TESTNET: string | undefined
      NEXT_PUBLIC_MOCK: string | undefined
      // Alchemy
      // TODO move this to the API
      NEXT_PUBLIC_ALCHEMY_API_KEY: string
      NEXT_PUBLIC_ALCHEMY_TESTNET_API_KEY: string
    }
  }
  // get typings on translation keys
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IntlMessages extends MessagesType {}
}
