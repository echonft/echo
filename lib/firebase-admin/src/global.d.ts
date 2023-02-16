export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      FIREBASE_ADMIN_PRIVATE_KEY: string
    }
  }
}
