declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      VERCEL_URL: string
    }
  }
}
