declare global {
  namespace NodeJS {
    interface Process {
      env: {
        ALCHEMY_API_KEY: string
        NEXT_PUBLIC_ALCHEMY_KEY: string
      }
    }
  }
}
