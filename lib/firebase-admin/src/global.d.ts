export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY: string
    }
  }
}
