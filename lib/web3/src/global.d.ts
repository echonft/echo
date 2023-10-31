declare global {
  namespace NodeJS {
    interface Process {
      env: {
        NEXT_PUBLIC_CHAIN_ID: string
        NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string
      }
    }
  }
}
