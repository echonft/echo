export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      API_ENV: string | undefined
      NEXTAUTH_URL_INTERNAL: string | undefined
      NEXTAUTH_URL: string | undefined
    }
  }
}
