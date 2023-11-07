declare global {
  namespace NodeJS {
    interface Process {
      env: { FIREBASE_PROJECT_ID: string; FIREBASE_CLIENT_EMAIL: string; FIREBASE_PRIVATE_KEY: string }
    }
  }
}
