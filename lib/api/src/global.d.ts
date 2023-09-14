export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      NEXT_PUBLIC_API_URL: string
      NODE_ENV: 'production' | 'development'
    }
  }
}
