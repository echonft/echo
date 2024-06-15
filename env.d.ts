// noinspection JSUnusedGlobalSymbols

declare namespace NodeJS {
  interface Process {
    env: {
      ANALYZE?: string
      AUTH_DISCORD_ID: string
      AUTH_DISCORD_SECRET: string
      AUTH_SECRET: string
      CI?: number | 'true' | '1'
      ENV?: 'production' | 'staging' | 'testnet' | 'development' | 'test'
      NEXT_PUBLIC_IS_TESTNET?: '1'
      NEXT_PUBLIC_VERCEL_URL: string
      NEXT_RUNTIME: 'nodejs' | 'edge'
      NODE_ENV?: 'production' | 'development' | 'test'
      SECRET_MANAGER_EMAIL: string
      SECRET_MANAGER_PRIVATE_KEY: string
    }
  }
}
