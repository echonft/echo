import { MessagesType } from '@lib/messages'

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
}
