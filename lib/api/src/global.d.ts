export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      API_APP_ENV: string | undefined
      IRON_PASSWORD: string
    }
  }
}
