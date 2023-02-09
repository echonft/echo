export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      NEXT_PUBLIC_ALCHEMY_API_KEY_GOERLI: string
      NEXT_PUBLIC_ALCHEMY_API_KEY_MAINNET: string
    }
  }
}
