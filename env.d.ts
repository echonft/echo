// noinspection JSUnusedGlobalSymbols

declare namespace NodeJS {
  interface Process {
    env: {
      CI?: number | 'true' | '1'
      ENV?: 'production' | 'staging' | 'testnet' | 'development' | 'test'
      NEXT_PUBLIC_IS_TESTNET?: '1'
      NEXT_PUBLIC_VERCEL_URL: string
      NEXT_RUNTIME: 'nodejs' | 'edge'
      SECRET_MANAGER_EMAIL: string
      SECRET_MANAGER_PRIVATE_KEY: string
      NODE_ENV?: 'production' | 'development' | 'test'
    }
  }
}
