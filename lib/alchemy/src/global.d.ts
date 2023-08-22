export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      NODE_ENV: 'production' | 'development' | 'test'
      ALCHEMY_API_KEY: string
    }
  }
}
