export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      BASE_URL: string
    }
  }
}
