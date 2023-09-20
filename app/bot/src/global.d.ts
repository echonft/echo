export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      APP_URL: string
    }
  }
}
