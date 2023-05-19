export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      ALCHEMY_API_KEY: string
    }
  }
}
