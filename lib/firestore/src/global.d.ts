export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      FIREBASE_PROJECT_ID: string
      FIREBASE_CLIENT_EMAIL: string
      FIREBASE_PRIVATE_KEY: string
    }
  }
}
