declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      VERCEL_URL: string
      NODE_ENV: 'production' | 'development'
    }
  }
}
