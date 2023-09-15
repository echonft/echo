export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      FIREBASE_PROJECT_ID: string | undefined
      FIREBASE_CLIENT_EMAIL: string | undefined
      FIREBASE_PRIVATE_KEY: string | undefined
    }
  }
}
