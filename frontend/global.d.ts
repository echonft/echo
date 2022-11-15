import messages from './lib/messages/en.json'

type Messages = typeof messages
// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface IntlMessages extends Messages {}

export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      NEXT_PUBLIC_APP_ENV: string | undefined
      // Test
      NEXT_PUBLIC_TESTNET: string | undefined
      // Alchemy
      NEXT_PUBLIC_ALCHEMY_API_KEY: string
      NEXT_PUBLIC_ALCHEMY_TESTNET_API_KEY: string
      // Server
      API_APP_ENV: string | undefined
      IRON_PASSWORD: string
    }
  }
}
